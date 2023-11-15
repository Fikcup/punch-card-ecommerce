// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { CreateProductInput } from "../../types/inputs/product";
import { Product } from "../../models/Product";

const productRepo = (() => {
    return mySQLDataSource.getRepository(Product);
})();

export const createProduct = async (
    input: CreateProductInput
): Promise<Product> => {
    const { name, description, price, stockQuantity } = input;

    // inserts new product
    const insertResult = await productRepo.insert(
        { name, description, price, stockQuantity }
    );

    // fetches new product
    const product = await productRepo.findOneOrFail({
        where: { id: insertResult.generatedMaps[0].id }
    });

    return product;
};