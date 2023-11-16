// int dependencies
import { In } from "typeorm";
import { mySQLDataSource } from "../../database/connection";
import { Coupon } from "../../models/Coupon";
import { CustomerCoupon } from "../../models/CustomerCoupon"
import { verifyToken } from "../../utils/token";

export const fetchOwnCoupons = async (
    token: string
): Promise<Coupon[]> => {
    // extract userId from token
    const userId = verifyToken(token).decoded.userId;

    // grabs all unused coupons
    const customerCoupons = await mySQLDataSource.getRepository(CustomerCoupon)
        .find({
            where: {
                customerId: userId,
                used: false
            }
        });

    // returns all coupons the customer has access to
    const couponIds = customerCoupons.map(coupon => coupon.couponId);
    return await mySQLDataSource.getRepository(Coupon)
        .find({
            where: {
                id: In(couponIds)
            }
        });
};