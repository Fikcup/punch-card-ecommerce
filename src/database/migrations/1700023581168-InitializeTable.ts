import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeTable1700023581168 implements MigrationInterface {
    name = 'InitializeTable1700023581168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                type ENUM('ADMIN', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                deletedAt TIMESTAMP NULL,
                UNIQUE KEY unique_user_username (username),
                UNIQUE KEY unique_user_email (email)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE orders (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                userId INT NOT NULL,
                orderDate DATETIME NOT NULL,
                invoiceId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE invoices (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                orderId INT NOT NULL,
                paymentDate DATETIME NOT NULL,
                paymentToken VARCHAR(255) NOT NULL,
                subTotal FLOAT NOT NULL,
                status ENUM('PAID', 'REFUNDED') NOT NULL DEFAULT 'PAID',
                FOREIGN KEY (orderId) REFERENCES orders(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE coupons (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                couponCode VARCHAR(255) NOT NULL,
                purchasesRequired INT NOT NULL,
                dollarAmount INT NULL,
                discountPercentage INT NULL,
                maxDollarValue INT NULL,
                active TINYINT(1) NOT NULL DEFAULT 1,
                UNIQUE KEY unique_coupon_couponCode (couponCode)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE customercoupons (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                orderId INT NOT NULL,
                couponId INT NOT NULL,
                used TINYINT(1) NOT NULL DEFAULT 0,
                FOREIGN KEY (orderId) REFERENCES orders(id),
                FOREIGN KEY (couponId) REFERENCES coupons(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE ordercoupons (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                orderId INT NOT NULL,
                couponId INT NOT NULL,
                FOREIGN KEY (orderId) REFERENCES orders(id),
                FOREIGN KEY (couponId) REFERENCES coupons(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE products (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                price FLOAT NOT NULL,
                stockQuantity INT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
                deletedAt TIMESTAMP NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE orderitems (
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                orderId INT NOT NULL,
                productId INT NOT NULL,
                quantity INT NOT NULL,
                subTotal FLOAT NOT NULL,
                FOREIGN KEY (orderId) REFERENCES orders(id),
                FOREIGN KEY (productId) REFERENCES products(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
        await queryRunner.query(`DROP TABLE IF EXISTS orders`);
        await queryRunner.query(`DROP TABLE IF EXISTS invoices`);
        await queryRunner.query(`DROP TABLE IF EXISTS coupons`);
        await queryRunner.query(`DROP TABLE IF EXISTS customercoupons`);
        await queryRunner.query(`DROP TABLE IF EXISTS ordercoupons`);
        await queryRunner.query(`DROP TABLE IF EXISTS products`);
        await queryRunner.query(`DROP TABLE IF EXISTS orderitems`);
    }

}
