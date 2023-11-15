// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export enum InvoiceStatus {
    Paid = "PAID",
    Unpaid = "REFUNDED"
};

@Entity("invoices")
export class Invoice {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    orderId: number;

    @Column({ type: "datetime" })
    @IsDate()
    paymentDate: Date;

    @Column({ type: "varchar", length: 255 })
    @IsString()
    paymentToken: string;

    @Column({ type: "float" })
    @IsNumber()
    @IsPositive()
    subTotal: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatus
    })
    status: InvoiceStatus;
}