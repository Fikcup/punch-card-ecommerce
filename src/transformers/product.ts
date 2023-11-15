// int dependencies
import { Product } from "../models/Product";
import { GQLProduct } from "../types/graphQLTypes";

export const productTransformer = (input: Product): GQLProduct => {
    const {
        id,
        name,
        description,
        price,
        stockQuantity
    } = input;

    return {
        id: String(id),
        name,
        description,
        price,
        stockQuantity
    }
};

export const productArrayTransformer = (products: Product[]): GQLProduct[] => {
    return products.map(productTransformer);
};