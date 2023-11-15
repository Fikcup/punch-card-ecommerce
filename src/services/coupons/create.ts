// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { AdminChangeActiveCouponInput } from "../../types/inputs/coupon";
import { Coupon } from "../../models/Coupon";

const couponRepo = (() => {
    return mySQLDataSource.getRepository(Coupon);
})();

export const issueNewActiveCoupon = async (
    input: AdminChangeActiveCouponInput
): Promise<Coupon> => {
    const { 
        couponCode, 
        dollarAmount, 
        discountPercentage, 
        maxDollarValue, 
        purchasesRequired 
    } = input;

    // establishes query runner
    const queryRunner = mySQLDataSource.createQueryRunner();
    await queryRunner.connect();

    // starts transaction
    await queryRunner.startTransaction();
    try {
        // deactivates existing coupon deal
        await queryRunner.manager.update(
            Coupon, 
            { active: true }, 
            { active: false }
        );

        // creates new active coupon
        await queryRunner.manager.save(
            Coupon,
            { 
                couponCode, 
                purchasesRequired,
                dollarAmount, 
                discountPercentage, 
                maxDollarValue 
            }
        );

        await queryRunner.commitTransaction();
    } catch (err) {
        // rollbacks if any failures occur
        await queryRunner.rollbackTransaction();
        throw new Error(err);
    } finally {
        // releases queryRunner transaction
        await queryRunner.release();
    }

    return await couponRepo.findOneOrFail({ where: { couponCode }});
};