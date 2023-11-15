// ext dependencies
import { Entity, PrimaryGeneratedColumn, Column, RelationId } from 'typeorm';
import {
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

// int dependencies
import { User } from "./User"

@Entity()
export class Coupon {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @RelationId((user: User) => user.id)
    userId: number;

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
    maxValue?: number;

    @Column()
    @IsBoolean()
    active: boolean;
}