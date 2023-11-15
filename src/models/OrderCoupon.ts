// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';

// int dependencies
import { Coupon } from './Coupon';

@Entity("ordercoupons")
export class OrderCoupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    couponId: number;

    @ManyToMany(() => Coupon, (coupon: Coupon) => coupon.id)
    @JoinColumn()
    coupon: Coupon;
}