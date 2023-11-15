// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsPositive } from 'class-validator';

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

    @CreateDateColumn({ name: "CreatedAt", type: "timestamp", nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: "UpdatedAt", type: "timestamp", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "DeletedAt", type: "timestamp", nullable: true })
    deletedAt!: Date | null;
}