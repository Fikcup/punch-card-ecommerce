// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { CustomerCoupon } from "../../models/CustomerCoupon";
import { InvoiceStatus } from "../../models/Invoice";
import { Order } from "../../models/Order";
import { GQLStoreOverview } from "../../types/graphQLTypes";

const ordersRepo = (() => {
    return mySQLDataSource.getRepository(Order);
})();

const customerCouponsRepo = (() => {
    return mySQLDataSource.getRepository(CustomerCoupon);
})();

export const getStoreOverview = async (): Promise<GQLStoreOverview> => {
    // fetches count of all orders with an invoice status of PAID
    const paidOrderCount = await ordersRepo
        .createQueryBuilder("orders")
        .innerJoinAndSelect(
            "orders.invoice", 
            "invoices",
            "invoices.status = :invoiceStatus",
            { invoiceStatus: InvoiceStatus.Paid }
        )
        .getCount();

    // fetches count of all customer coupons issued
    const discountsIssuedCount = await customerCouponsRepo
        .createQueryBuilder("customercoupons")
        .getCount();

    // fetches count of all customer coupons with used flag set to true
    const discountsRedeemedCount = await customerCouponsRepo
        .createQueryBuilder("customercoupons")
        .where("customercoupons.used = :used", { used: true })
        .getCount();

    return {
        totalPurchases: paidOrderCount,
        totalDiscountsIssued: discountsIssuedCount,
        totalDiscountsRedeemed: discountsRedeemedCount,
    };
}