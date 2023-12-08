"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("./userModel"));
const BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    summary: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 150,
    },
    content: {
        type: String,
        required: true,
        minlength: 100,
    },
    contentCategory: {
        required: true,
        type: String,
        minlength: 4,
        maxlength: 50,
    },
    mainPicture: {
        type: String,
    },
    creationDate: {
        default: new Date().getTime(),
        type: Number,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: userModel_1.default,
    },
});
const BlogModel = (0, mongoose_1.model)("Blog", BlogSchema);
exports.default = BlogModel;
