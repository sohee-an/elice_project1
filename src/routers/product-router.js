import { Router } from "express";
import { productService } from "../services";
import multer from "multer";

const productRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage })

productRouter.get('/', async (req, res, next) => {
    const products = await productService.getProducts();

    res.status(200).json(products);
})

productRouter.post('/register', upload.single('img'), async (req, res, next) => {
    
    const image = req.file;
    //나중에 폼으로 대분류, 소분류 카테고리를 받아서 카테고리서비스를 통해 아이디를 가져와서 저장한다.
    const { name, price, description, brand, category_id } = req.body

    console.log(req.file, req.body);

    const product = await productService.addProduct({
        name,
        price,
        description,
        brand,
        category_id,
        image 
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