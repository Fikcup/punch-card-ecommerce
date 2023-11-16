export type CheckoutInput = {
    items: CheckoutItems[];
    couponCodes: string[];
    token: string;
};

export type CheckoutItems = {
    id: string;
    quantity: number;
}