// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId, OneToOne } from 'typeorm';
import { IsDate } from 'class-validator';

// int dependencies
import { User } from "./User";
import { Invoice } from './Invoice';

@Entity()
export class Order {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @RelationId((user: User) => user.id)
    userId: number;

    @Column()
    @IsDate()
    orderDate: Date;

    @Column()
    @OneToOne(() => Invoice, (invoice) => invoice.id)
    invoice: Invoice;
}