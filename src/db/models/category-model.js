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

    async update(category_id, category) {
        const filter = { _id: category_id };
        const update = { category: category };

        const updatedCategory = await Category.findOneAndUpdate(filter, update);
        return updatedCategory;
    }

    async remove(category_id) {
        const filter = { _id: category_id };

        const deletedCategory = await Category.deleteOne(filter);
        return deletedCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel }