// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId, ManyToOne } from 'typeorm';
import {
    IsPositive,
    IsInt,
} from 'class-validator';

// int dependencies
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderItem {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @RelationId((order: Order) => order.id)
    orderId: number;

    @Column()
    @RelationId((product: Product) => product.id)
    productId: number;

    @Column()
    @ManyToOne(() => Product, (product: Product) => product.id)
    product: Product;

    @Column()
    @IsPositive()
    @IsInt()
    quantity: number;

    @Column()
    @IsPositive()
    subTotal: number;
}