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