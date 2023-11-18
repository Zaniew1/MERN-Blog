import multer, { Multer, FileFilterCallback } from 'multer'
import sharp from 'sharp'
import { Request, Response, NextFunction} from 'express';
import AppError from '../utils/appError';
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
// this code saves pictures directly to disc
// const multerStorage = multer.diskStorage({
//     destination: (req: Request, file: Express.Multer.File, cb:DestinationCallback) => {
//         cb(null, 'images/'); 
//     },
//     filename: (req: Request, file: Express.Multer.File, cb:FileNameCallback) => {
//         cb(null, `${Date.now()}_${file.originalname}`); // Use the original filename for the uploaded file
//     },
// });
// this code saves pictures to a memory
const multerStorage = multer.memoryStorage();
const multerFilter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(null, false)
    }

} 


const uploadMulter: Multer = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
});

export const resizeUserPhoto = (req:Request, res:Response, next:NextFunction) => {
    console.log(req.file)
    console.log(req.body)
    if(!req.file) return next(new AppError('There is no photo!', 400))
    req.file.filename = `user-${Date.now()}_${req.file.originalname}`;

    sharp(req.file.buffer)
        .resize(100,100)
        .toFormat('jpeg')
        .jpeg({quality: 90,})
        .toFile(`images/users/${req.file.filename}`)
        req.body.avatar = req.file.filename
        console.log(req.body)
        next();
}       
export const resizePostPhoto = (req:Request, res:Response, next:NextFunction) => {
    if(!req.file) return next(new AppError('There is no photo!', 400))
    req.file.filename = `post-${Date.now()}_${req.file.originalname}`
    sharp(req.file.buffer)
        .resize(800,800)
        .toFormat('jpeg')
        .jpeg({quality: 90,})
        .toFile('images/posts/'+req.file.filename)
        req.body.mainPicture = req.file.filename
        next();
}        

export const uploadPostPhoto = uploadMulter.single('mainPicture')
export const uploadUserPhoto = uploadMulter.single('avatar')