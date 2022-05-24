import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model('products', ProductSchema);

class ProductModel {
    async create(productInfo) {
        const createdProduct = await Product.create(productInfo);
        return createdProduct;
    }
}

const productModel = new ProductModel();

export { productModel };