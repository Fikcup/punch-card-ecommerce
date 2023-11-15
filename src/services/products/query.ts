// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { Product } from "../../models/Product";

const productRepo = (() => {
    return mySQLDataSource.getRepository(Product);
})();

export const getProductCatalog = async (): Promise<Product[]> => {
    // finds and returns all products that have not been soft deleted
    return await productRepo.find({
        withDeleted: false
    });
};