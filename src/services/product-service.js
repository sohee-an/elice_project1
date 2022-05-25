import { productModel } from "../db";

class ProductService {
    constructor(productModel) {
        this.productModel = productModel
    }

    async addProduct(productInfo) {
        const product = await this.productModel.create(productInfo);
        return product;
    }

    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }

    async getProductDetail(product_id) {
        const product = await this.productModel.findOneById(product_id);
        return product;
    }

    async deleteProduct(product_id) {
        const deletedProduct = await this.productModel.remove(product_id);
        return deletedProduct;
    }

    async updateProduct(product_id, updateProductInfo) {
        const updatedProduct = await this.productModel.update(product_id, updateProductInfo)
        return updatedProduct;
    }

}

const productService = new ProductService(productModel);

export { productService }