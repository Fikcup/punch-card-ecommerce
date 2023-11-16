// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';

// int dependencies
import { CustomerCoupon } from './CustomerCoupon';

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
    customerCouponId: number;

    @OneToOne(
        () => CustomerCoupon, 
        (customerCoupon: CustomerCoupon) => customerCoupon.id
    )
    @JoinColumn()
    customerCoupon: CustomerCoupon;
}