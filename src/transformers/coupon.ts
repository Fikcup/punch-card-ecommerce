// int dependencies
import { Coupon } from "../models/Coupon"
import { GQLCoupon } from "../types/graphQLTypes"

export const couponTransformer = (input: Coupon): GQLCoupon => {
    const { 
        id, 
        couponCode, 
        purchasesRequired,
        dollarAmount, 
        discountPercentage, 
        maxDollarValue, 
        active, 
    } = input;
    
    return {
        id: String(id),
        couponCode,
        purchasesRequired,
        dollarAmount,
        discountPercentage,
        maxDollarValue,
        active
    }
}