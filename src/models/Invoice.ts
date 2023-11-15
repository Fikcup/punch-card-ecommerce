// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export enum InvoiceStatus {
    Paid = "PAID",
    Unpaid = "UNPAID"
};

@Entity("invoices")
export class Invoice {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    @IsInt()
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