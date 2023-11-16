import catchAsync from '../utils/catchAsync';
import {Request, Response, NextFunction} from 'express';
import UserModel from '../models/userModel'
import  AppError from '../utils/appError';
import Email from '../utils/email';
import 'dotenv/config';
import { createSendToken, comparePasswords, signToken} from '../helpers/helpers'
import {UserSchemaType} from '../models/userModel'
import crypto from 'crypto'

    interface AuthRequest extends Request {
        user?: UserSchemaType;
    }
    export const getMe = catchAsync(async (req:AuthRequest, res:Response, next:NextFunction)=>{
        const {name, surname, avatar, email} = await UserModel.findById(req.user?._id) as UserSchemaType

        res.status(200).json({
            status: 'success',
            id: req.user?._id,
            name,
            surname,
            email,
            avatar
        });
  
    })

    type NewUserType = {
        name:string,
        surname:string,
        email: string,
        password:string, 
        confirmPassword:string
    }
    export const createNewUser = catchAsync( async (req: Request, res:Response, next: NextFunction) => {
        // validating data
        const {name, surname, email, password, confirmPassword} = req.body as NewUserType;
        if(!email || !password) return next(new AppError('There have to be email and password', 400));
        if(!name || !surname) return next(new AppError('There have to be name and surname', 400));
        if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            return next(new AppError('Password needs to contain min. 8 letters, 1 big letter, 1 small letter and 1 special character', 400));
        }
        if(password !== confirmPassword) return next(new AppError("Passwords are not the same", 400));
        
        // we check if email already exists
        const user = await UserModel.findOne({email});
        if(user){
            return next(new AppError("There is user with that email already", 400));
        }
        const newUser = await UserModel.create({
            name,
            surname,
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

    export const loginUser = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
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

    export const logoutUser = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
        req.cookies = ''
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });
        res.status(200).json({ status: 'success' });
    })

    export const forgetPassword = catchAsync( async (req: Request, res: Response, next:NextFunction)=>{
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
    export const changePassword = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
        const {oldPass, newPass, confirmNewPass, email} = req.body
        // const hashedNewPass = crypto.createHash('sha256').update(newPass).digest('hex');
        const user = await UserModel.findOne({email}).select('+password');
        if(!user) return next(new AppError('User not found', 404));

        const isGoodPassword = await comparePasswords(oldPass, user.password);
        if(!isGoodPassword) return next(new AppError('Old password that you provided was incorrect', 400));
        if(newPass !== confirmNewPass) return next(new AppError('New password and confirm password are not the same', 400));
        user.password = newPass;
        user.confirmPassword = confirmNewPass;
        await user.save();
        res.status(200).json({
            status: 'success',
        })
    })

    export const editUser = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
        const {id, name, surname} = req.body;
        if(!name || !surname) return next(new AppError("Imię i nazwisko jest wymagane",400))
        if(name.langth < 3 || surname.langth < 3) return next(new AppError("Imię i nazwisko musi mieć przynajmniej 3 znaki",400))
        if(name.langth > 12 || surname.langth > 15) return next(new AppError("Imię musi mieć max 12 znaków a nazwisko max 15",400))
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if(!user){return next(new AppError('There is no such user', 404))}
        else{
            res.status(200).json({
                status: 'successfully edited',
                user
            });
        }   
    })

    export const resetPassword = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
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