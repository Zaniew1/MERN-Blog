import multer, { Multer, FileFilterCallback } from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";

// this code saves pictures to a memory
const multerStorage = multer.memoryStorage();
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMulter: Multer = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.file.filename = `user-${Date.now()}_${req.file.originalname}`;
      try {
        await sharp(req.file.buffer)
          .resize(100, 100)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`images/users/${req.file.filename}`);
        req.body.avatar = req.file.filename;
        next();
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      next();
    }
  }
);
export const resizePostPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.file.filename = `post-${Date.now()}_${req.file.originalname}`;
      try {
        await sharp(req.file.buffer)
          .resize(800, 800)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile("images/posts/" + req.file.filename);
        req.body.mainPicture = req.file.filename;
        next();
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      next();
    }
  }
);

export const uploadPostPhoto = uploadMulter.single("mainPicture");
export const uploadUserPhoto = uploadMulter.single("avatar");
