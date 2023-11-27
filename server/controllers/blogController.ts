
import catchAsync from '../utils/catchAsync';
import  { RequestHandler,Request, Response, NextFunction } from 'express';
import  AppError from '../utils/appError';
import BlogModel from '../models/blogModel';
import { BlogSchemaType} from '../types/blogTypes';
import 'dotenv/config';
import { sendNewsletter } from '../helpers/helpers';
export const createNewArticle: RequestHandler = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    let {title, summary, content,  contentCategory, creator, mainPicture} = req.body as BlogSchemaType;
    if(!title  || !summary || !content  || !contentCategory ){
        return next(new AppError('There are not enough information provided', 400));
    }
    if(title.length < 8 || title.length > 100){
        return next(new AppError('Length of the title should be between 10 and 100 chars', 400));
    }
    if(summary.length < 8 || summary.length > 150){
        return next(new AppError('Length of the summary should be between 10 and 150 chars', 400));
    }
    if(content.length < 10 || content.length > 10000){
        return next(new AppError('Length of the content should be between 10 and 10000 chars', 400));
    }
    if(contentCategory.length < 4 || contentCategory.length > 50){
        return next(new AppError('Length of the contentCategory should be between 4 and 50  chars', 400));
    }
    if(!mainPicture) return next(new AppError("There has to be main picture", 400))
    const newPost = await BlogModel.create( {title, summary, content, contentCategory, mainPicture, creator});
    // Send info about new post to everyone that subscribed to a newsletter 
    sendNewsletter(newPost.title);
    res.status(201).json({
        status: "success",
        data:{ 
            post: newPost
        }
    });
})

export const deleteArticle: RequestHandler<{id:string}> = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    const post = await BlogModel.findByIdAndDelete(req.params.id as string);
    if(!post) return next(new AppError('There is no such post', 404));
    res.status(200).json({
      status: 'successfully deleted',
    });
})

export const editArticle: RequestHandler<{id:string}> = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    const id = req.params.id as string;
    let {title, summary, content,  contentCategory, mainPicture} = req.body as BlogSchemaType;
    if(!title  || !summary || !content  || !contentCategory ){
        return next(new AppError('There are not enough information provided', 400));
    }
    if(title.length < 8 || title.length > 100){
        return next(new AppError('Length of the title should be between 10 and 100 chars', 404));
    }
    if(summary.length < 8 || summary.length > 150){
        return next(new AppError('Length of the summary should be between 10 and 150 chars', 404));
    }
    if(content.length < 100 ){
        return next(new AppError('Length of the content should be min 100 chars', 404));
    }
    if(contentCategory.length < 4 || contentCategory.length > 50){
        return next(new AppError('Length of the contentCategory should be between 4 and 50  chars', 404));
    }
    const oldPost = await BlogModel.findOne({ _id: id });
    if(!oldPost) return next(new AppError('You cant edit not existing post', 404));
    // if user didint upload new picture, then assign old photo
    if(oldPost && mainPicture == ""){req.body.mainPicture = oldPost.mainPicture}
    
    const post = await BlogModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if(!post) return next(new AppError('There is no such post', 404));
    else{
        res.status(200).json({
            status: 'successfully edited',
            post
        });
    }           
})

export const getAllArticles: RequestHandler = catchAsync( async (req: Request, res: Response, next:  NextFunction) => {
    const posts = await BlogModel.find().populate('creator', ['name', 'surname', 'email', 'avatar']);
    res.status(200).json({
        status: 'success',
        posts
    });
})

export const getArticle: RequestHandler<{id:string}> = catchAsync( async (req: Request, res: Response, next:  NextFunction) => {
    const post = await BlogModel.findById(req.params.id).populate('creator', ['name', 'surname', 'email','avatar']);
    if(!post)return next(new AppError('There is no such post', 404));
    res.status(200).json({
        status: "success",
        post
    });

})


