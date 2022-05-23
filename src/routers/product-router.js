import { Router } from "express";
import { productService } from "../services";

const productRouter = Router();

productRouter.post('/register', async (req, res, next) => {
    const { name, price, description, madeBy } = req.body

    const product = await productService.addProduct({
        name,
        price,
        description,
        madeBy
    })

    console.log(product);
    res.status(200).json(product);
})

export { productRouter };