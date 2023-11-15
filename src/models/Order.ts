// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsDate, IsInt, IsPositive } from 'class-validator';

// int dependencies
import { Invoice } from './Invoice';

@Entity("orders")
export class Order {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsPositive()
    @IsInt()
    userId: number;

    @Column()
    @IsDate()
    orderDate: Date;

    @OneToOne(() => Invoice, (invoice) => invoice.id)
    @JoinColumn()
    invoice: Invoice;
}