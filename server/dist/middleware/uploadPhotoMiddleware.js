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
exports.uploadUserPhoto = exports.uploadPostPhoto = exports.resizePostPhoto = exports.resizeUserPhoto = void 0;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// this code saves pictures to a memory
const multerStorage = multer_1.default.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const uploadMulter = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.resizeUserPhoto = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.file.filename = `user-${Date.now()}_${req.file.originalname}`;
        try {
            yield (0, sharp_1.default)(req.file.buffer)
                .resize(100, 100)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`images/users/${req.file.filename}`);
            req.body.avatar = req.file.filename;
            next();
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    else {
        next();
    }
}));
exports.resizePostPhoto = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        req.file.filename = `post-${Date.now()}_${req.file.originalname}`;
        try {
            yield (0, sharp_1.default)(req.file.buffer)
                .resize(800, 800)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile("images/posts/" + req.file.filename);
            req.body.mainPicture = req.file.filename;
            next();
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    else {
        next();
    }
}));
exports.uploadPostPhoto = uploadMulter.single("mainPicture");
exports.uploadUserPhoto = uploadMulter.single("avatar");
