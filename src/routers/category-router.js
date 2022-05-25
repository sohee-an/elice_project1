import { categoryService } from "../services";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get('/', async (req, res, next) => {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
})

categoryRouter.post('/register', async (req, res, next) => {
    const category = req.body.category;
    const newCategory = await categoryService.addCategory(category);

    res.status(200).json(newCategory);
})

categoryRouter.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const category = req.body.category;

    const updatedCategory = await categoryService.updateCategory(id, category);

    res.status(200).json(updatedCategory);
})

categoryRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    const deletedCategory = await categoryService.deleteCategory(id);

    console.log(deletedCategory);
    res.status(200).json(deletedCategory);
})

export { categoryRouter };