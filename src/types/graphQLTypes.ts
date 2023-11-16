// int dependencies
import { InvoiceStatus } from "../models/Invoice";

export type GQLCoupon = {
    id: string;
    couponCode: string;
    purchasesRequired: number;
    dollarAmount?: number;
    discountPercentage?: number;
    maxDollarValue?: number;
    active: boolean;
}

export type GQLProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
};

export type GQLStoreOverview = {
    totalPurchases: number;
    totalDiscountsIssued: number;
    totalDiscountsRedeemed: number;
};

export type GQLInvoice = {
    id: string;
    orderId: string;
    paymentDate: string;
    paymentToken: string;
    subTotal: number;
    status: InvoiceStatus;
};

export type GQLOrderItem = {
    id: string;
    orderId: string;
    product: GQLProduct;
    quantity: number;
    subTotal: number;
};

export type GQLOrder = {
    id: string;
    userId: string;
    orderDate: string;
    items: GQLOrderItem[];
    invoice: GQLInvoice;
};
