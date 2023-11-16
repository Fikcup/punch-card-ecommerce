// int dependencies
import { Invoice } from "../models/Invoice";
import { GQLInvoice } from "../types/graphQLTypes";

export const invoiceTransformer = (
    input: Invoice
): GQLInvoice => {
    const {
        id,
        orderId,
        paymentDate,
        paymentToken,
        subTotal,
        status,
    } = input;

    return {
        id: String(id),
        orderId: String(orderId),
        paymentDate: paymentDate.toDateString(),
        paymentToken,
        subTotal,
        status,
    };
};