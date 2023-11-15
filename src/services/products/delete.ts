// int dependencies
import { mySQLDataSource } from "../../database/connection";
import { Product } from "../../models/Product";

const productRepo = (() => {
    return mySQLDataSource.getRepository(Product);
})();

export const softDeleteProduct = async (productId: number): Promise<Product> => {
    // soft deletes product
    await productRepo.softDelete(productId);

    // fetches and returns soft deleted product
    return await productRepo.findOneOrFail({
        withDeleted: true,
        where: { id: productId },
    });
}