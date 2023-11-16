// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

// int dependencies
import { Order } from "./Order";

export enum UserType {
    Admin = "ADMIN",
    Customer = "CUSTOMER"
};

@Entity("users")
export class User {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: UserType
    })
    type: UserType;

    @Column({ type: "varchar", length: 255, unique: true })
    @MinLength(5)
    username: string;

    @Column({ type: "varchar", length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "varchar", length: 255, select: false })
    @MinLength(8)
    password: string;

    @Column({ type: "varchar", length: 255 })
    firstName: string;

    @Column({ type: "varchar", length: 255 })
    lastName: string;

    @OneToMany(() => Order, (order) => order.userId)
    @JoinColumn()
    orders: Order

    @CreateDateColumn({ name: "CreatedAt", type: "timestamp", nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ name: "UpdatedAt", type: "timestamp", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "DeletedAt", type: "timestamp", nullable: true })
    deletedAt!: Date | null;
}