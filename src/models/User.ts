// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

// int dependencies
import { Order } from './Order';

export enum UserType {
    Admin = "ADMIN",
    Customer = "CUSTOMER"
};

@Entity()
export class User {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: UserType
    })
    type: UserType;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
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