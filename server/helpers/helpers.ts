import {Request, Response} from 'express';
import jwt  from 'jsonwebtoken' ;
import {UserSchemaType} from '../types/blogTypes'
import bcrypt from 'bcryptjs'
import 'dotenv/config';

export const signToken = (id:string) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    if (!jwtSecret || !jwtExpiresIn) {
        throw new Error('JWT_SECRET or JWT_EXPIRES_IN environment variables are not defined.');
    }
    return jwt.sign({id}, jwtSecret, {
        expiresIn: jwtExpiresIn
    })
}
export const createSendToken = (user:UserSchemaType, statusCode:number, req:Request, res:Response) => {
    const token = signToken(user._id);
    const numberOfDaysCookieExpires: string | undefined = process.env.JWT_COOKIE_EXPIRES_IN;
    let expirationTime = 0;
    if(numberOfDaysCookieExpires){
        expirationTime  = parseInt(numberOfDaysCookieExpires) * (24 * 60 * 60 * 1000)
    }else{
        expirationTime = 2 * (24 * 60 * 60 * 1000)
    }
    const cookieOption = {
        expires: new Date(Date.now() + expirationTime),
        httpOnly: true,
        secure: false
      }
    if(process.env.NODE_ENV === 'PRODUCTION') cookieOption.secure = true
    res.cookie('jwt', token, );
    user.password = '';
    res.status(statusCode).json({
      status: 'success',
      token,
      data: user
    });
  };

export const comparePasswords = async function( typedPassword:string, databasePassword:string){
    // this function compares two passwords, one password is hashed, one is not,
    // comparizon is made by hashing first password and then comparing both hashed passwords
    return await bcrypt.compare(typedPassword, databasePassword);
}




