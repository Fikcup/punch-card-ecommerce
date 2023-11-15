// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId, ManyToMany } from 'typeorm';
import {
    IsPositive,
    IsInt,
} from 'class-validator';

// int dependencies
import { Coupon } from './Coupon';
import { Order } from './Order';

@Entity()
export class OrderCoupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @RelationId((order: Order) => order.id)
    orderId: number;

    @Column()
    @RelationId((coupon: Coupon) => coupon.id)
    couponId: number;

    @Column()Q
    @ManyToMany(() => Coupon, (coupon: Coupon) => coupon.id)
    coupon: Coupon;

    @Column()
    @IsPositive()
    @IsInt()
    quantity: number;

    @Column()
    @IsPositive()
    subTotal: number;
}