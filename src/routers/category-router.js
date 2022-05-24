import { categoryService } from "../services";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.post('/register', async (req, res, next) => {
    const category = req.body.category;
    const newCategory = await categoryService.addCategory(category);
    console.log(newCategory);
    res.status(200).json(newCategory);
})

export { categoryRouter };