// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId, ManyToMany } from 'typeorm';
import { IsBoolean } from 'class-validator';

// int dependencies
import { Coupon } from './Coupon';
import { Order } from './Order';

@Entity()
export class CustomerCoupon {  
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
    @IsBoolean()
    used: boolean;
}