import catchAsync from '../utils/catchAsync';
import express from 'express';
import jwt  from 'jsonwebtoken' ;
import UserModel from '../models/userModel'
import  AppError from '../utils/appError';
import  crypto from 'crypto';
import Email from '../utils/email';
import bcrypt from 'bcryptjs'
import 'dotenv/config';

const signToken = (id:number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    if (!jwtSecret || !jwtExpiresIn) {
        throw new Error('JWT_SECRET or JWT_EXPIRES_IN environment variables are not defined.');
    }
    return jwt.sign({id}, jwtSecret, {
        expiresIn: jwtExpiresIn
    })
}
const createSendToken = (user:any, statusCode:number, req: express.Request, res: express.Response) => {
    const token = signToken(user._id);
    
    // res.cookie('jwt', token, {
    //     expires: new Date(
    //       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    //   });
  
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };

export const comparePasswords = async function( typedPassword:string, databasePassword:string){
    // this function compares two passwords, one password is hashed, one is not,
    // comparizon is made by hashing first password and then comparing both hashed passwords
    return await bcrypt.compare(typedPassword, databasePassword);
}

// działa
export const createNewUser = catchAsync( async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const {email, password, confirmPassword} = req.body;
    if(!email || !password){
        return next(new AppError('There have to be email and password', 400));
    }
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        return next(new AppError('Password needs to contain min. 8 letters, 1 big letter, 1 small letter and 1 special character', 400));
    }
    if(password !== confirmPassword){
        return next(new AppError("Passwords are not the same", 400));
    }
    // we check if email already exists
    const user = await UserModel.findOne({email});
    if(user){
            return next(new AppError("There is user with that email already", 400));
        }
        const newUser = await UserModel.create({
            email,
            password,
            confirmPassword
        });
        // we create a token by giving it user id we just created , and secret key  created by us and stored in .env file
        // we also set algorithm and expire date after which token will become useless
        const url = `${req.protocol}://${req.get('host')}/`;
        // we send email with welcome Card component as welcome message
        await new Email(newUser, url).sendWelcome();
        createSendToken(newUser, 201, req, res);
    })
    // działa
export const loginUser = catchAsync(async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
        const {email, password} = req.body;
        if(!email || !password){
            return next(new AppError('There have to be email and password', 400));
        }
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            return next(new AppError('Password needs to contain min. 8 letters, 1 big, 1 small letter and 1 special character', 400));
        }
        const user = await UserModel.findOne({email}).select('+password');
        if (!user){
            return next(new AppError('User with that email does not exist', 401));
        }
        const isGoodPassword = await comparePasswords(password, user.password);
        if(!isGoodPassword) {
            return next(new AppError('Incorrect password', 401));
        }
        createSendToken(user, 200, req, res);
    })
    //działa
    export const logoutUser = catchAsync(async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
          });
          res.status(200).json({ status: 'success' });
    })


    export const forgetPassword = catchAsync( async (req: express.Request, res: express.Response, next:express.NextFunction)=>{
        // find an account with that email
        const user = await UserModel.findOne({email:req.body.email})
        // check if this account exists
        if(!user) return next( new AppError('Użytkownik nie znaleziony', 404));
        
        const resetToken = user.createPasswordResetToken();
        // we turn off any validation in UserSchema
        await user.save({validateBeforeSave: false});
        
        try{
        const resetURL = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;
        await new Email(user, resetURL).sendPasswordReset();
            res.status(200).json({
                status: 'success',
                message: 'Token sent to email !',
                resetToken
            })
        }
        catch(err){
            console.log(err)
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave : false});
            return next(new AppError('No reset token sent', 500));
        }
    });
    export const resetPassword = catchAsync(async (req: express.Request, res: express.Response, next:express.NextFunction) =>{
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user =  await UserModel.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt:Date.now()}})
        if(!user) return next(new AppError('User not found', 404))
        user.password = req.body.password;
        user.confirmPassword = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined
        await user.save();
        const token = signToken(user.id);
        res.status(200).json({
            status: 'success',
            token
        })
    })