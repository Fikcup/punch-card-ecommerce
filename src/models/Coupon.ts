// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

@Entity("coupons")
export class Coupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(5)
    couponCode: string;

    @Column({ nullable: true })
    @IsPositive()
    @IsNumber()
    @Min(1)
    dollarAmount?: number;

    @Column({ nullable: true })
    @IsPositive()
    @IsNumber()
    @Min(1)
    discountPercentage?: number;

    @Column({ nullable: true })
    @IsPositive()
    @IsNumber()
    maxDollarValue?: number;

    @Column()
    @IsBoolean()
    active: boolean;
}