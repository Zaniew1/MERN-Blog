import express from 'express';
import * as blogController from '../controllers/blogController';
// import {protect} from '../middleware/authMiddleware'
import { uploadPostPhoto, resizePostPhoto } from '../middleware/uploadPhotoMiddleware';

const blogRouter = express.Router();

blogRouter
    .route('/')
    .post(uploadPostPhoto, resizePostPhoto,  blogController.createNewArticle)
    .get(blogController.getAllArticles)

blogRouter
    .route('/:id')
    .get(blogController.getArticle)
    .put(uploadPostPhoto,resizePostPhoto, blogController.editArticle)
    .delete(blogController.deleteArticle)

export default blogRouter;