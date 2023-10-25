import express from 'express';
import * as blogController from '../controllers/blogController';


const blogRouter = express.Router();
blogRouter.get('/article/:id', blogController.getArticle);
blogRouter.post('/article/', blogController.createNewArticle);
blogRouter.get('/', blogController.getAllArticles);
blogRouter.delete('/article/:id', blogController.deleteArticle);
blogRouter.patch('/article/:id', blogController.editArticle);

export default blogRouter;