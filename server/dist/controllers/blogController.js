"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticle = exports.getAllArticles = exports.editArticle = exports.deleteArticle = exports.createNewArticle = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const blogModel_1 = __importDefault(require("../models/blogModel"));
require("dotenv/config");
const helpers_1 = require("../helpers/helpers");
exports.createNewArticle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, summary, content, contentCategory, creator, mainPicture } = req.body;
    if (!title || !summary || !content || !contentCategory) {
        return next(new appError_1.default("There are not enough information provided", 400));
    }
    if (title.length < 8 || title.length > 100) {
        return next(new appError_1.default("Length of the title should be between 10 and 100 chars", 400));
    }
    if (summary.length < 8 || summary.length > 150) {
        return next(new appError_1.default("Length of the summary should be between 10 and 150 chars", 400));
    }
    if (content.length < 10 || content.length > 10000) {
        return next(new appError_1.default("Length of the content should be between 10 and 10000 chars", 400));
    }
    if (contentCategory.length < 4 || contentCategory.length > 50) {
        return next(new appError_1.default("Length of the contentCategory should be between 4 and 50  chars", 400));
    }
    if (!mainPicture)
        return next(new appError_1.default("There has to be main picture", 400));
    const newPost = yield blogModel_1.default.create({
        title,
        summary,
        content,
        contentCategory,
        mainPicture,
        creator,
    });
    // Send info about new post to everyone that subscribed to a newsletter
    (0, helpers_1.sendNewsletter)(newPost.title);
    res.status(201).json({
        status: "success",
        data: {
            post: newPost,
        },
    });
}));
exports.deleteArticle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield blogModel_1.default.findByIdAndDelete(req.params.id);
    if (!post)
        return next(new appError_1.default("There is no such post", 404));
    res.status(200).json({
        status: "successfully deleted",
    });
}));
exports.editArticle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let { title, summary, content, contentCategory, mainPicture } = req.body;
    if (!title || !summary || !content || !contentCategory) {
        return next(new appError_1.default("There are not enough information provided", 400));
    }
    if (title.length < 8 || title.length > 100) {
        return next(new appError_1.default("Length of the title should be between 10 and 100 chars", 404));
    }
    if (summary.length < 8 || summary.length > 150) {
        return next(new appError_1.default("Length of the summary should be between 10 and 150 chars", 404));
    }
    if (content.length < 100) {
        return next(new appError_1.default("Length of the content should be min 100 chars", 404));
    }
    if (contentCategory.length < 4 || contentCategory.length > 50) {
        return next(new appError_1.default("Length of the contentCategory should be between 4 and 50  chars", 404));
    }
    const oldPost = yield blogModel_1.default.findOne({ _id: id });
    if (!oldPost)
        return next(new appError_1.default("You cant edit not existing post", 404));
    // if user didint upload new picture, then assign old photo
    if (oldPost && mainPicture == "") {
        req.body.mainPicture = oldPost.mainPicture;
    }
    const post = yield blogModel_1.default.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!post)
        return next(new appError_1.default("There is no such post", 404));
    else {
        res.status(200).json({
            status: "successfully edited",
            post,
        });
    }
}));
exports.getAllArticles = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).json({
        status: "success",
    });
    // const posts = await BlogModel.find().populate("creator", [
    //   "name",
    //   "surname",
    //   "email",
    //   "avatar",
    // ]);
    // console.log(posts);
    // res.status(200).json({
    //   status: "success",
    //   posts,
    // });
}));
exports.getArticle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield blogModel_1.default.findById(req.params.id).populate("creator", [
        "name",
        "surname",
        "email",
        "avatar",
    ]);
    if (!post)
        return next(new appError_1.default("There is no such post", 404));
    res.status(200).json({
        status: "success",
        post,
    });
}));
