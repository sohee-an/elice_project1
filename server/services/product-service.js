import { productModel } from "../db";

class ProductService {
    constructor(productModel) {
        this.productModel = productModel
    }

    async addProduct(productInfo) {
        const foundProduct = await this.productModel.findOneByNameAndBrand({ name: productInfo.name, brand: productInfo.brand });

        if (foundProduct) {
            throw new Error("이미 등록된 상품입니다.");
        }

        const product = await this.productModel.create(productInfo);
        return product;
    }

    async getProducts(option) {
        const products = await this.productModel.findAll();
        const { lc, mc } = option
        let filteredProducts = [];

        if (lc && mc) {
            filteredProducts = products.filter((product) => product.category_id.largeCategory === lc && product.category_id.mediumCategory === mc)
        } else if (lc && (mc === undefined)) {
            filteredProducts = products.filter((product) => product.category_id.largeCategory === lc)
        } else if ((lc === undefined) && mc) {
            filteredProducts = products.filter((product) => product.category_id.mediumCategory === mc)
        } else {
            filteredProducts = products;
        }

        return filteredProducts;
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
        // const foundProduct = await this.productModel.findOneByNameAndBrand({ name: updateProductInfo.name, brand: updateProductInfo.brand });

        // if (foundProduct) {
        //     throw new Error("이미 등록된 상품입니다. 상품의 이름 또는 브랜드를 바꿔주세요");
        // }

        // 

        const updatedProduct = await this.productModel.update(product_id, updateProductInfo)
        return updatedProduct;
    }

    ////////////////
    async updateProduct(productId,reviewsDate){
        const updateReview=await this.productModel.updateReview(productId,reviewsDate)
        console.log(updateReview);
    }

    async getSearchedProducts(productName) {
        const searchedProducts = await this.productModel.findByString(productName);

        if (searchedProducts.length === 0) {
            throw new Error("조회된 상품이 없습니다.")
        }

        return searchedProducts;
    }

}

const productService = new ProductService(productModel);

export { productService }