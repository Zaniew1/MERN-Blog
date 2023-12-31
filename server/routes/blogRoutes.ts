import express from "express";
import * as blogController from "../controllers/blogController";
// import {protect} from '../middleware/authMiddleware'
import { allowCors } from "../helpers/helpers";
import {
  uploadPostPhoto,
  resizePostPhoto,
} from "../middleware/uploadPhotoMiddleware";

const blogRouter = express.Router();

blogRouter
  .route("/")
  .post(uploadPostPhoto, resizePostPhoto, blogController.createNewArticle)
  .get(blogController.getAllArticles);

blogRouter
  .route("/:id")
  .get(allowCors, blogController.getArticle)
  .put(uploadPostPhoto, resizePostPhoto, blogController.editArticle)
  .delete(blogController.deleteArticle);

export default blogRouter;
