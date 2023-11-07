
import catchAsync from '../utils/catchAsync';
import express, { RequestHandler,Request, Response, NextFunction } from 'express';
import  AppError from '../utils/appError';
import BlogModel from '../models/blogModel';
import {BlogSchemaType} from '../models/blogModel';
import fs from 'fs';
import 'dotenv/config';


export const createNewArticle: RequestHandler = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    let {title, summary, content,  contentCategory, mainPicture, creator, creatorAvatar} = req.body as BlogSchemaType;
    const uploadedFile = req.file;

    // if(!title  || !summary || !content  || !contentCategory){
    //     return next(new AppError('There are not enough information provided', 400));
    // }
    // if(title.length < 8 || title.length > 100){
    //     return next(new AppError('Length of the title should be between 10 and 100 chars', 404));
    // }
    // if(summary.length < 8 || summary.length > 150){
    //     return next(new AppError('Length of the summary should be between 10 and 150 chars', 404));
    // }
    // if(content.length < 10 || content.length > 10000){
    //     return next(new AppError('Length of the content should be between 10 and 10000 chars', 404));
    // }
    // if(contentCategory.length < 4 || contentCategory.length > 50){
    //     return next(new AppError('Length of the contentCategory should be between 4 and 50  chars', 404));
    // }
    // if(req.file){
        console.log(req.file)
    //     const {originalname, path} = req.file;
    //     const parts = originalname.split('.');
    //     const ext = parts[parts.length - 1];
    //     const newPath = path+"."+ext;
    //     fs.renameSync(path, newPath );
        req.body.mainPicture = `${req.file?.destination}${req.file?.originalname}`;
    // }
    const newPost = await BlogModel.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            post: newPost
        }
    });
})

export const deleteArticle: RequestHandler<{id:string}> = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    const post = await BlogModel.findByIdAndDelete(req.params.id);
    if(!post){
        return next(new AppError('There is no such post', 404));
    }
    res.status(200).json({
      status: 'successfully deleted',
    });


})

export const editArticle: RequestHandler<{id:string}> = catchAsync( async (req:Request, res:Response, next: NextFunction) => {
    const id = req.params.id;
    const post = await BlogModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if(!post){
        return next(new AppError('There is no such post', 404));
    }
    else{
        res.status(200).json({
            status: 'successfully edited',
            post
        });
    }           

})

export const getAllArticles: RequestHandler = catchAsync( async (req: Request, res: Response, next:  NextFunction) => {
    const posts = await BlogModel.find();
    res.status(200).json({
        status: 'success',
        posts
    });
})

export const getArticle: RequestHandler<{id:string}> = catchAsync( async (req: Request, res: Response, next:  NextFunction) => {
    const post = await BlogModel.findById(req.params.id);
    if(!post){
        return next(new AppError('There is no such post', 404));
    }
    res.status(200).json({
        status: "success",
        post
    });

})

