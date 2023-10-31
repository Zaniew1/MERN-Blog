
import catchAsync from '../utils/catchAsync';
import express, { RequestHandler } from 'express';
import  AppError from '../utils/appError';
import BlogModel from '../models/blogModel';
import {BlogSchemaType} from '../models/blogModel';
import  { MongoClient } from "mongodb";
import 'dotenv/config';

export const createNewArticle: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const {title, summary, content} = req.body as BlogSchemaType;
    if(!title  || !summary || !content){
        return next(new AppError('There is are not information', 404))
    }
    const newPost = await BlogModel.create(req.body)
    res.status(201).json({
        status: "success",
        data:{
            post: newPost
        }
    });
})

export const deleteArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    await BlogModel.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });


})

export const editArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    const post = await BlogModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    
  
    if(!post){
        return next(new AppError('There is no such post', 404))
    }
    else{
        res.json('test 3');
    }           

})

export const getAllArticles: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const posts = await BlogModel.find();
    res.json({
        status: 200,
        posts
    });
})

export const getArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    const post = await BlogModel.findById(id);
    if(!post){
        return next(new AppError('There is no such post', 404))
    }
    res.status(200).json({
        status: "success",
        post
    });

})

