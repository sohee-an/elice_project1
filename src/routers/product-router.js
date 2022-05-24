import { Router } from "express";
import { productService } from "../services";

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
    const products = await productService.getProducts();

    res.status(200).json(products);
})

productRouter.post('/register', async (req, res, next) => {
    const { name, price, description, madeBy } = req.body

    const product = await productService.addProduct({
        name,
        price,
        description,
        madeBy
    })

    res.status(200).json(product);
})


export { productRouter };