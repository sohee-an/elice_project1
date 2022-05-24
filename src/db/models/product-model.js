import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model('products', ProductSchema);

//productInfo는 객체이다.
class ProductModel {
    async create(productInfo) {
        const createdProduct = await Product.create(productInfo);
        return createdProduct;
    }

    async findAll() {
        const products = await Product.find({});
        return products;
    }

    async update() {

    }

    async remove(product_id) {
        const filter = { _id: product_id };
        const removedProduct = await Product.deleteOne(filter);

        return removedProduct;
    }
}

const productModel = new ProductModel();

export { productModel };