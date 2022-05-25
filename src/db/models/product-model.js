import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model('products', ProductSchema);
class ProductModel {

    async create(productInfo) { //productInfo는 객체이다.
        const createdProduct = await Product.create(productInfo);
        return createdProduct;
    }

    async findAll() {
        const products = await Product.find({});
        return products;
    }

    async findOneById(product_id) {
        const product = await Product.findOne({ _id: product_id })
        return product;
    }

    async update(product_id, updateProductInfo) { //updateProductInfo는 객체이다.
        const filter = { _id: product_id };

        const updatedProduct = await Product.updateOne(filter, updateProductInfo);

        return updatedProduct;
    }

    async remove(product_id) {
        const filter = { _id: product_id };

        const removedProduct = await Product.deleteOne(filter);

        return removedProduct;
    }
}

const productModel = new ProductModel();

export { productModel };