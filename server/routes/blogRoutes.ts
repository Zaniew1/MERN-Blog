import express from 'express';
import * as blogController from '../controllers/blogController';

const blogRouter = express.Router();

blogRouter
    .route('/')
    .post(blogController.createNewArticle)
    .get(blogController.getAllArticles)

blogRouter
    .route('/:id')
    .get(blogController.getArticle)
    .patch(blogController.editArticle)
    .delete(blogController.deleteArticle)

export default blogRouter;