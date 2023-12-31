// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { CheckoutInput, CheckoutItems } from "../../types/inputs/order";
import { verifyToken } from "../../utils/token";
import { CustomerCoupon } from "../../models/CustomerCoupon";
import { Order } from "../../models/Order";
import { OrderCoupon } from "../../models/OrderCoupon";
import { OrderItem } from "../../models/OrderItem";
import { Product } from "../../models/Product";
import { Invoice, InvoiceStatus } from "../../models/Invoice";
import { calculateSubtotal, generateRandomPaymentToken } from "../invoices/create";
import { Coupon } from "../../models/Coupon";
import { User } from "../../models/User";


/**
 * Creates an order, respective order items, order coupons, and invoice
 * 
 * Note: logic cannot be extracted to seperate files due to QueryRunner transaction limitations
 * 
 * @param input order input specifying what items and coupons are to be used to create an order and process payment
 * @returns Order with completed fields
 */
export const checkoutOrder = async (input: CheckoutInput): Promise<Order> => {
  const { items, couponCodes, token } = input;

  if (items.length === 0) {
    throw new Error("At least one item is required to checkout");
  }

  // extract userId from token
  const userId = verifyToken(token).decoded.userId;

  // order id scoping
  let orderId: number;

  // establishes query runner
  const queryRunner = mySQLDataSource.createQueryRunner();
  await queryRunner.connect();

  // starts transaction
  await queryRunner.startTransaction();

  try {
    // create order
    const order = await queryRunner.manager.insert(Order, {
      userId,
      orderDate: new Date(),
    });
    orderId = order.generatedMaps[0].id;

    // fetch products to be used
    const productIdsArray = items.map((obj) => Number(obj.id));
    const products = await queryRunner.manager
        .createQueryBuilder(Product, "prods")
        .whereInIds(productIdsArray)
        .getMany();

    // verify products are in stock
    for (let product of products) {
      if (product.stockQuantity <= 0) {
        throw new Error(`Product of ID ${product.id} is out of stock.`);
      }
    }

    // create order items for each item and update stock quantity
    const productAndQuantityArray = combineQuantityAndPriceArrays(
        items, products
    );

    // save order items
    const orderItems: OrderItem[] = [];
    
    const orderItemPromises: Promise<any>[] = [];
    for (let product of productAndQuantityArray) {
        const subTotal = product.price * product.quantity;
        const orderItem = queryRunner.manager.create(
          OrderItem, 
          {
              orderId: orderId,
              productId: product.id,
              quantity: product.quantity,
              subTotal: subTotal,
          }
        );
        orderItems.push(orderItem);
        orderItemPromises.push(
            queryRunner.manager.save(orderItem)
        );
        orderItemPromises.push(
          queryRunner.manager.update(
            Product,
            {
              id: product.id
            },
            {
              stockQuantity: (product.stockQuantity - product.quantity)
            }
          )
        );
    }
    await Promise.all(orderItemPromises);

    // if coupons are provided, find relevant coupons to apply to order
    if (couponCodes.length > 0) {
      // verify customer has been issued coupon associated with coupon code
      const customerCoupons = await queryRunner.manager
        .createQueryBuilder(CustomerCoupon, "customercoupons")
        .innerJoinAndSelect(
          "customercoupons.coupon",
          "coupons",
          "coupons.couponCode IN (:...couponCodesArray)",
          { couponCodesArray: couponCodes }
        )
        .where("customercoupons.customerId = :customerId", {
          customerId: userId,
        })
        .andWhere("customercoupons.used = :usedValue", {
          usedValue: false,
        })
        .getMany();

      if (couponCodes.length !== customerCoupons.length) {
        // filters for invalid coupon codes
        const couponCodesFetched = customerCoupons.map(
          obj => obj.coupon.couponCode
        );
        const unmatchedCodes = couponCodes.filter(
          value => !couponCodesFetched.includes(value)
        );

        throw new Error(
          `One or more coupons is invalid for the customer: ${unmatchedCodes}`
        );
      }

      // create order coupons for each applied coupon
      const orderCouponPromises: Promise<any>[] = [];
      for (let customerCoupon of customerCoupons) {
        orderCouponPromises.push(
          queryRunner.manager.save(OrderCoupon, {
            orderId: orderId,
            customerCouponId: customerCoupon.id,
          })
        );
      }
      await Promise.all(orderCouponPromises);

      // mark customer coupons as used
      const customerCouponIdsArray = customerCoupons.map((obj) => obj.id);
      await queryRunner.manager
        .createQueryBuilder()
        .update(CustomerCoupon)
        .set({ used: true })
        .whereInIds(customerCouponIdsArray)
        .execute();

      // reduce customer coupons to coupon values
      const coupons = customerCoupons.map((cc) => cc.coupon);

      // calculate subtotal
      const subTotal = calculateSubtotal(orderItems, coupons);

      // NOTE: paymentToken is intended to be an external field with a transaction id from a payment processor. For the purposes of this project, this field is randomly generated
      const paymentToken = generateRandomPaymentToken();

      // create invoice for order
      await queryRunner.manager.insert(
        Invoice,
        {
            orderId: orderId,
            paymentDate: new Date(),
            paymentToken,
            subTotal,
            status: InvoiceStatus.Paid
        }
      );
    } else {
      // if customer has no coupons calculate subtotal
      const subTotal = calculateSubtotal(orderItems, []);

      // NOTE: paymentToken is intended to be an external field with a transaction id from a payment processor. For the purposes of this project, this field is randomly generated
      const paymentToken = generateRandomPaymentToken();

      // create invoice for order
      await queryRunner.manager.insert(
        Invoice,
        {
            orderId: orderId,
            paymentDate: new Date(),
            paymentToken,
            subTotal,
            status: InvoiceStatus.Paid
        }
      );
    }

    // check if user reaches coupon issue amount
    const activeCoupon = await mySQLDataSource.getRepository(Coupon)
      .findOneByOrFail({
        active: true
      });
    const user = await mySQLDataSource.getRepository(User)
      .findOneByOrFail({
        id: userId
      });

    // issues coupon if user has reached number of purchases required
    if ((user.purchasesSinceLastCoupon + 1) >= activeCoupon.purchasesRequired) {
      await queryRunner.manager.getRepository(CustomerCoupon).insert({
        customerId: userId,
        couponId: activeCoupon.id,
      });
      
      // reset purchasesSinceLastCoupon to 0
      await queryRunner.manager.getRepository(User).update(
        { id: userId },
        { purchasesSinceLastCoupon: 0 }
      );
    } else {
      // add to purchasesSinceLastCoupon value
      const newTotalPurchases = user.purchasesSinceLastCoupon + 1;
      await queryRunner.manager.getRepository(User).update(
        { id: userId },
        { purchasesSinceLastCoupon: newTotalPurchases }
      );
    }

    await queryRunner.commitTransaction();

    // releases queryRunner transaction
    await queryRunner.release();

  } catch (err) {
    // rollbacks if any failures occur
    await queryRunner.rollbackTransaction();

    // releases queryRunner transaction
    await queryRunner.release();

    throw new Error(err);
  }

  // due to complications with model joins, invoice and product fields will return null
  const order = await mySQLDataSource.getRepository(Order)
      .createQueryBuilder("orders")
      .where("orders.id = :id", {
        id: orderId
      })
      .innerJoinAndSelect(Invoice, "invoice", "invoice.orderId = orders.id")
      .innerJoinAndSelect(OrderItem, "items", "items.orderId = orders.id")
      .innerJoinAndSelect(Product, "products", "products.id = items.productId")
      .getOneOrFail();

  return order;
};

// Combines checkout item ids and quantity with product catalog prices
export const combineQuantityAndPriceArrays = (
    quantity: CheckoutItems[], 
    products: Product[]
):{ 
    id: number; 
    price: number; 
    quantity: number;
    stockQuantity: number;
}[] => {
    const combinedArray: { 
        id: number; 
        price: number; 
        quantity: number; 
        stockQuantity: number;
    }[] = quantity.map((obj1) => {
        const matchingObj2 = products.find((obj2) => Number(obj1.id) === obj2.id);
      
        if (matchingObj2) {
          return {
            id: matchingObj2.id,
            price: matchingObj2.price,
            quantity: obj1.quantity,
            stockQuantity: matchingObj2.stockQuantity,
          };
        }

        // Removes unmatched entities
        return null
    }).filter(Boolean);

    return combinedArray;
}

