// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from "class-validator";

@Entity("coupons")
export class Coupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    @IsString()
    @MinLength(5)
    couponCode: string;

    @Column({ type: "int" })
    @IsPositive()
    @IsInt()
    purchasesRequired: number;

    @Column({ type: "float", nullable: true })
    @IsPositive()
    @IsNumber()
    @Min(1)
    dollarAmount?: number;

    @Column({ type: "int", nullable: true })
    @IsPositive()
    @IsNumber()
    @Min(1)
    discountPercentage?: number;

    @Column({ type: "float", nullable: true })
    @IsPositive()
    @IsNumber()
    maxDollarValue?: number;

    @Column({ type: "tinyint", default: 1 })
    @IsBoolean()
    active: boolean;
}