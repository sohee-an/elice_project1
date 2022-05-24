import { productModel } from "../db";

class ProductService {
    constructor(productModel) {
        this.productModel = productModel
    }

    async addProduct(productInfo) {
        const { name, price, description, madeBy } = productInfo
        const product = await this.productModel.create({ name, price, description, madeBy });
        return product;
    }

    async getProducts() {
        const products = await this.productModel.findAll();
        return products;
    }

}

const productService = new ProductService(productModel);

export { productService }