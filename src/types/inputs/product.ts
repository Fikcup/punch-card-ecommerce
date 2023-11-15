export type CreateProductInput = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
}

export type UpdateProductInput = {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    stockQuantity?: number;
}