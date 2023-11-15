// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';

// int dependencies
import { Coupon } from './Coupon';

@Entity("ordercoupons")
export class OrderCoupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    orderId: number;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    couponId: number;

    @ManyToMany(() => Coupon, (coupon: Coupon) => coupon.id)
    @JoinColumn()
    coupon: Coupon;
}