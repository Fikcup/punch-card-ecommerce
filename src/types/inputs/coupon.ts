export type AdminChangeActiveCouponInput = {
    couponCode: string;
    purchasesRequired: number;
    dollarAmount?: number;
    discountPercentage?: number;
    maxDollarValue?: number;
}