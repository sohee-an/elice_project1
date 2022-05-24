import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model('categories', CategorySchema);

export class CategoryModel {
    async create(category) {
        const createdNewCategory = await Category.create({ category: category });
        return createdNewCategory;
    }

    async findAll() {
        const categories = await Category.find({});
        return categories;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel }