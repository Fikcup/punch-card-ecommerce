// int dependencies
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { GQLOrder, GQLOrderItem } from "../types/graphQLTypes";
import { invoiceTransformer } from "./invoice";
import { productTransformer } from "./product";

export const orderTransformer = (
    input: Order
): GQLOrder => {
    const {
        id,
        userId,
        orderDate,
        invoice,
        items,
    } = input;

    return {
        id: String(id),
        userId: String(userId),
        orderDate: orderDate.toDateString(),
        invoice: invoiceTransformer(invoice),
        items: orderItemArrayTransformer(items),
    }
};

export const orderItemTransformer = (
    input: OrderItem
): GQLOrderItem => {
    const {
        id,
        orderId,
        product,
        quantity,
        subTotal,
    } = input;

    return {
        id: String(id),
        orderId: String(orderId),
        product: productTransformer(product),
        quantity,
        subTotal,
    };
};

export const orderItemArrayTransformer = (
    orderItems: OrderItem[]
): GQLOrderItem[] => {
    return orderItems.map(orderItemTransformer);
};