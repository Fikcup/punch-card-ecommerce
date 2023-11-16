// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';

// int dependencies
import { Coupon } from './Coupon';

@Entity("customercoupons")
export class CustomerCoupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    customerId: number;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    couponId: number;

    @ManyToOne(() => Coupon, (coupon: Coupon) => coupon.id)
    @JoinColumn()
    coupon: Coupon;

    @Column({ type: "tinyint", default: 0 })
    @IsBoolean()
    used: boolean;
}