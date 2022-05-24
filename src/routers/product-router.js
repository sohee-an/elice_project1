import { Router } from "express";
import { productService } from "../services";

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
    const products = await productService.getProducts();

    res.status(200).json(products);
})

productRouter.post('/register', async (req, res, next) => {
    const { name, price, description, madeBy, category_id } = req.body

    const product = await productService.addProduct({
        name,
        price,
        description,
        madeBy,
        category_id
    })

    res.status(200).json(product);
})

productRouter.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const { name, price, description, madeBy, category_id } = req.body

    const updateProduct = await productService.updateProduct(id, {
        name,
        price,
        description,
        madeBy,
        category_id
    })

    res.status(200).json(updateProduct);
})

productRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    const result = await productService.deleteProduct(id);

    res.status(200).json(result);
})


export { productRouter };