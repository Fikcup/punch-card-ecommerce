// ext dependencies
import { DataSource } from "typeorm";

// int dependencies
import { entities } from "../models";

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities,
    migrations: ["src/database/migrations/*.ts"]
});
