
import catchAsync from '../utils/catchAsync';
import express, { RequestHandler } from 'express';
import  AppError from '../utils/appError';
import BlogModel from '../models/blogModel';


export const createNewArticle: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    res.json('test 1');
})

export const deleteArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    res.json('test 2');

})

export const editArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    res.json('test 3');

})

export const getAllArticles: RequestHandler = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const posts = await BlogModel.find()
    console.log(posts)
    res.json({
        status: 200,
        posts
    });
})

export const getArticle: RequestHandler<{id:string}> = catchAsync( async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    const id = req.params.id;
    res.json('test getOneArticle');

})