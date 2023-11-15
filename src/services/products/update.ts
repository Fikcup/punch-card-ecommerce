// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { UpdateProductInput } from "../../types/inputs/product";
import { Product } from "../../models/Product";

const productRepo = (() => {
    return mySQLDataSource.getRepository(Product);
})();

export const updateProduct = async (
    input: UpdateProductInput
): Promise<Product> => {
    const { id, name, description, price, stockQuantity } = input;
    const parsedId = parseInt(id);

    // checks if more than id has been provided
    if (Object.keys(input).length === 1) {
        // returns product if not updatable fields have been provided
        return await productRepo.findOneOrFail({
            where: { id: parsedId }
        });
    }

    // updates product
    await productRepo.update(
        { id: parsedId }, 
        { name, description, price, stockQuantity }
    );

    // fetches and returns updated product
    return await productRepo.findOneOrFail({ where: { id: parsedId }});
};