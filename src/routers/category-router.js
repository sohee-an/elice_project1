import { categoryService } from "../services";
import { Router } from "express";
import multer from "multer";

const categoryRouter = Router();

//////////////////////이미지 저장을 위한 코드//////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage })
/////////////////////////////////////////////////////////////////

categoryRouter.get('/', async (req, res, next) => {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
});

categoryRouter.post('/register', upload.single('img'), async (req, res, next) => {
    const image = req.file.filename;
    const { largeCategory, mediumCategory } = req.body;
    const newCategory = await categoryService.addCategory({ largeCategory, mediumCategory, image });

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