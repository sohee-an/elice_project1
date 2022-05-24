import { categoryModel } from '../db';

class CategoryService {

    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async addCategory(categoryInfo) {
        const createdNewCategory = await this.categoryModel.create(categoryInfo);
        return createdNewCategory;
    }

    async getCategories() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    async updateCategory(category_id, newCategoryInfo) {
        const updatedCategory = await this.categoryModel.update(category_id, newCategoryInfo);
        return updatedCategory;
    }

    async deleteCategory(category_id) {
        const deletedCategory = await this.categoryModel.remove(category_id);
        return deletedCategory;
    }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };