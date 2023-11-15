// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import {
    IsPositive,
    IsInt,
} from 'class-validator';

// int dependencies
import { Product } from './Product';

@Entity("orderitems")
export class OrderItem {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    @IsInt()
    orderId: number;

    @Column()
    @IsPositive()
    @IsInt()
    productId: number;

    @ManyToOne(() => Product, (product: Product) => product.id)
    @JoinColumn()
    product: Product;

    @Column()
    @IsPositive()
    @IsInt()
    quantity: number;

    @Column()
    @IsPositive()
    subTotal: number;
}