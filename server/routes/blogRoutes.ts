import express from 'express';
import * as blogController from '../controllers/blogController';
import { Request} from 'express';
import multer, { Multer } from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'images/'); 
    },
    filename: (req: Request, file, cb) => {
        const date = Date.now();
        cb(null, date+"_"+file.originalname); // Use the original filename for the uploaded file
    },
});
const uploadMulter: Multer = multer({ storage });

const blogRouter = express.Router();

blogRouter
    .route('/')
    .post( uploadMulter.single('mainPicture'), blogController.createNewArticle)
    .get(blogController.getAllArticles)

blogRouter
    .route('/:id')
    .get(blogController.getArticle)
    .patch(blogController.editArticle)
    .delete(blogController.deleteArticle)

export default blogRouter;