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
            INSERT INTO coupons (couponCode, purchasesRequired, dollarAmount, discountPercentage, maxDollarValue, active) 
            VALUES ('ABCDE', 3, 10.00, NULL, NULL, 1);
        `);
        await queryRunner.query(`
            INSERT INTO customercoupons (customerId, couponId, used) 
            VALUES (2, 1, 0), 
            (3, 1, 0);
        `);
        await queryRunner.query(`
            INSERT INTO products (name, description, price, stockQuantity)
            VALUES ('Product1', 'Description for Product1', 19.99, 100),
            ('Product2', 'Description for Product2', 29.99, 150),
            ('Product3', 'Description for Product3', 39.99, 200);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users WHERE username IN ('admin_user', 'customer1', 'customer2');
        `);
        await queryRunner.query(`
            DELETE FROM coupons WHERE couponCode = 'ABCDE';
        `);
        await queryRunner.query(`
            DELETE FROM customercoupons WHERE customerId IN (2, 3);
        `);
        await queryRunner.query(`
            DELETE from products WHERE name IN ('Product1', 'Product2', 'Product3');
        `);
    }

}
