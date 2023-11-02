
import catchAsync from '../utils/catchAsync';
import express, { RequestHandler } from 'express';
import  AppError from '../utils/appError';
import BlogModel from '../models/blogModel';
import {BlogSchemaType} from '../models/blogModel';
import 'dotenv/config';


export const createNewArticle: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const {title, summary, content} = req.body as BlogSchemaType;
    if(!title  || !summary || !content){
        return next(new AppError('There are not enough information provided', 404));
    }
    if(title.length < 10 || title.length > 50){
        return next(new AppError('Length of the title should be between 10 and 50 chars', 404));
    }
    if(summary.length < 10 || summary.length > 100){
        return next(new AppError('Length of the summary should be between 10 and 100 chars', 404));
    }
    if(content.length < 10 || content.length > 10000){
        return next(new AppError('Length of the content should be between 10 and 10000 chars', 404));
    }
    const newPost = await BlogModel.create(req.body);
    res.status(201).json({
        status: "success",
        data:{
            post: newPost
        }
    });
})

export const deleteArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const post = await BlogModel.findByIdAndDelete(req.params.id);
    if(!post){
        return next(new AppError('There is no such post', 404));
    }
    res.status(200).json({
      status: 'successfully deleted',
    });


})

export const editArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
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

export const getAllArticles: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const posts = await BlogModel.find();
    res.status(200).json({
        status: 'success',
        posts
    });
})

export const getArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const post = await BlogModel.findById(req.params.id);
    if(!post){
        return next(new AppError('There is no such post', 404));
    }
    res.status(200).json({
        status: "success",
        post
    });

})

