"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController = __importStar(require("../controllers/blogController"));
// import {protect} from '../middleware/authMiddleware'
const helpers_1 = require("../helpers/helpers");
const uploadPhotoMiddleware_1 = require("../middleware/uploadPhotoMiddleware");
const blogRouter = express_1.default.Router();
blogRouter
    .route("/")
    .post(uploadPhotoMiddleware_1.uploadPostPhoto, uploadPhotoMiddleware_1.resizePostPhoto, blogController.createNewArticle)
    .get(blogController.getAllArticles);
blogRouter
    .route("/:id")
    .get(helpers_1.allowCors, blogController.getArticle)
    .put(uploadPhotoMiddleware_1.uploadPostPhoto, uploadPhotoMiddleware_1.resizePostPhoto, blogController.editArticle)
    .delete(blogController.deleteArticle);
exports.default = blogRouter;
