// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsPositive } from "class-validator";
import { OrderItem } from "./OrderItem";

@Entity("products")
export class Product {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    description: string;

    @Column({ type: "float" })
    @IsPositive()
    price: number;

    @Column({ type: "int" })
    @IsPositive()
    stockQuantity: number;

    @OneToMany(() => OrderItem, (item) => item.product.id)
    @JoinColumn()
    productOrderItems: OrderItem[];

    @CreateDateColumn({ name: "CreatedAt", type: "timestamp", nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: "UpdatedAt", type: "timestamp", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "DeletedAt", type: "timestamp", nullable: true })
    deletedAt!: Date | null;
}