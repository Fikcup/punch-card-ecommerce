// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';

// int dependencies
import { Coupon } from './Coupon';

@Entity("customercoupons")
export class CustomerCoupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    @IsInt()
    orderId: number;

    @Column()
    @IsPositive()
    @IsInt()
    couponId: number;

    @ManyToMany(() => Coupon, (coupon: Coupon) => coupon.id)
    @JoinColumn()
    coupon: Coupon;

    @Column()
    @IsBoolean()
    used: boolean;
}