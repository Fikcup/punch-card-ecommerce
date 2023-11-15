// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId } from 'typeorm';
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

// int dependencies
import { Order } from "./Order";

export enum InvoiceStatus {
    Paid = "PAID",
    Unpaid = "UNPAID"
};

@Entity()
export class Invoice {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @RelationId((user: Order) => user.id)
    orderId: number;

    @Column()
    @IsDate()
    paymentDate: Date;

    @Column()
    @IsString()
    paymentToken: string;

    @Column()
    @IsNumber()
    @IsPositive()
    subTotal: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatus
    })
    invoiceStatus: InvoiceStatus;
}