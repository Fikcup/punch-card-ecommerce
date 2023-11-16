// int dependencies
import { Coupon } from "../../models/Coupon";
import { OrderItem } from "../../models/OrderItem";

export const calculateSubtotal = (
    items: OrderItem[],
    coupons: Coupon[]
): number => {
    const subtotal = items.reduce((total, item) => total + item.subTotal, 0);

    const discountedSubtotal = coupons.reduce((acc, coupon) => {
        if (coupon.dollarAmount) {
            // Apply fixed discount
            return acc - coupon.dollarAmount;
        } else if (coupon.discountPercentage) {
            // Validate percentage discount doesn't exceed max value
            const discountValue = (coupon.discountPercentage / 100) * acc;
            if (coupon.maxDollarValue && coupon.maxDollarValue < discountValue) {
                return acc - coupon.maxDollarValue;
            }
            return acc - discountValue;
        }

        return acc;
    }, subtotal);

    // Ensure the discounted subtotal is 0 or greater
    return Math.max(discountedSubtotal, 0);
};

// Generates random 8 digit payment token
export const generateRandomPaymentToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};