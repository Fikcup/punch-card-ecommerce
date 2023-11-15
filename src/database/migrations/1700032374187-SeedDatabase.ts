import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDatabase1700032374187 implements MigrationInterface {
    name = 'SeedDatabase1700032374187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (type, username, password, email, firstName, lastName) VALUES
            ('ADMIN', 'admin_user', '$2a$12$YQcJZaProG/37Gay1Y2LmuBxUFZ3f/erqJPGP2y86lJYE9/J6Db8e', 'admin@example.com', 'Admin', 'User'),
            ('CUSTOMER', 'customer1', '$2a$12$F6u4/lqIhY.MaYOQDFjhJegB/kBnYW/ikhWiV4s7b0j8Z6FfN7CjW', 'customer1@example.com', 'John', 'Doe'),
            ('CUSTOMER', 'customer2', '$2a$12$7q8z4PAC1Cq5yjuDyomFA.D2Wt./S4HaqWHg6qe8XDqELrG/.1qPa', 'customer2@example.com', 'Jane', 'Smith');
        `);
        await queryRunner.query(`
            INSERT INTO coupons (couponCode, dollarAmount, discountPercentage, maxDollarValue, active) 
            VALUES ('ABCDE', 10.00, NULL, NULL, 1);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users WHERE username IN ('admin_user', 'customer1', 'customer2');
        `);
        await queryRunner.query(`
            DELETE FROM coupons WHERE couponCode = 'ABCDE';
        `);
    }

}
