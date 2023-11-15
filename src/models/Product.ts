// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsPositive } from 'class-validator';

@Entity()
export class Product {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    @IsPositive()
    price: number;

    @Column()
    @IsPositive()
    stockQuantity: number;

    @CreateDateColumn({ name: "CreatedAt", type: "timestamp", nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: "UpdatedAt", type: "timestamp", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "DeletedAt", type: "timestamp", nullable: true })
    deletedAt!: Date | null;
}