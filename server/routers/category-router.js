import { categoryService } from "../services";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get('/', async (req, res, next) => {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
});

categoryRouter.post('/register', async (req, res, next) => {
    const { largeCategory, mediumCategory } = req.body;
    const newCategory = await categoryService.addCategory({ largeCategory, mediumCategory });

    res.status(200).json(newCategory);
});

categoryRouter.patch('/:id', async (req, res, next) => {
    const category_id = req.params.id;
    const { largeCategory, mediumCategory } = req.body;

    const updatedCategory = await categoryService.updateCategory(category_id, { largeCategory, mediumCategory });

    res.status(200).json(updatedCategory);
});

categoryRouter.delete('/:id', async (req, res, next) => {
    const category_id = req.params.id;

    const deletedCategory = await categoryService.deleteCategory(category_id);

    res.status(200).json(deletedCategory);
});

export { categoryRouter };