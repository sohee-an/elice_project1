import { categoryModel } from '../db';

class CategoryService {

    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async addCategory(category) {
        const createdNewCategory = await this.categoryModel.create(category);
        return createdNewCategory;
    }

    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };