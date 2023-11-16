// int dependencies
import { issueNewActiveCoupon } from "../services/coupons/create"
import { fetchOwnCoupons } from "../services/coupons/query";
import { checkoutOrder } from "../services/orders/create";
import { createProduct } from "../services/products/create";
import { softDeleteProduct } from "../services/products/delete";
import { getProductCatalog } from "../services/products/query";
import { updateProduct } from "../services/products/update";
import { getStoreOverview } from "../services/store/query";
import { couponTransformer } from "../transformers/coupon";
import { orderTransformer } from "../transformers/order";
import { productTransformer, productArrayTransformer } from "../transformers/product";
import { CheckoutInput } from "../types/inputs/order";

export const resolvers = {
    Query: {
        async me() {
            // TODO: validate input
            // TODO: call methods
            // TODO: transform data to match gql types
            // TODO: return data
        },
        async getCatalog() {
            const productCatalog = await getProductCatalog();;
            return productArrayTransformer(productCatalog);
        },
        async getStoreOverview() {
            return await getStoreOverview();
        },
        async getOwnCoupons(_, __, context) {
            const token = context.req.headers.authorization;
            if (!token) throw new Error('No token provided!');
            return await fetchOwnCoupons(token);
        },
        async validateToken() {
            // TODO: validate input
            // TODO: call methods
            // TODO: transform data to match gql types
            // TODO: return data
        }
    },

    Mutation: {
        async customerSignUp() {
            // TODO: validate input
            // TODO: call methods
            // TODO: transform data to match gql types
            // TODO: return data
        },
        async logIn() {
            // TODO: validate input
            // TODO: call methods
            // TODO: transform data to match gql types
            // TODO: return data
        },
        async checkout(_, { input }, context) {
            // TODO: validate input
            const token = context.req.headers.authorization;
            if (!token) throw new Error('No token provided!');

            const checkoutInput: CheckoutInput = {
                token,
                ...input
            };
            const order = await checkoutOrder(checkoutInput)
            return orderTransformer(order);
        },
        async adminUpdateProduct(_, { input }) {
            // TODO: validate input
            const updatedProduct = await updateProduct(input);
            return productTransformer(updatedProduct);
        },
        async adminCreateProduct(_,{ input }) {
            // TODO: validate input
            const newProduct = await createProduct(input);
            return productTransformer(newProduct);
        },
        async adminDeleteProduct(_, { productId }) {
            // TODO: validate input
            const deletedProduct = await softDeleteProduct(Number(productId));
            return productTransformer(deletedProduct);
        },
        async adminChangeActiveCoupon(_, { input } ) {
            // TODO: validate input
            const newCoupon = await issueNewActiveCoupon(input);
            return couponTransformer(newCoupon);
        }
    }
}