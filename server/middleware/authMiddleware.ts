import jwt  from 'jsonwebtoken' ;
import catchAsync from '../utils/catchAsync';
import UserModel from '../models/userModel'
import  AppError from '../utils/appError';
import {Request, Response, NextFunction} from 'express';
import {UserSchemaType} from '../types/blogTypes'

interface AuthRequest extends Request {
    user?: UserSchemaType;
  }

  type decodedTokenType ={
    id:string,
    iat:number,
    ext:number
  }
export const protect = catchAsync(async (req:AuthRequest , res:Response, next:NextFunction) => {
    // 1) Getting token and check of it's there
    let token:string = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : req.cookies.jwt;
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    try {
        const decoded = jwt.verify( token as string, process.env.JWT_SECRET as string)
        const {id} = decoded as decodedTokenType
        const currentUser = await UserModel.findById(id);
        if (!currentUser) {
          return next(new AppError('The user belonging to this token does no longer exist.', 401));
        }
        req.user = currentUser;
        next();
      } catch (err) {
            return next(new AppError('Invalid token. Please log in again.', 401));
      }
  });