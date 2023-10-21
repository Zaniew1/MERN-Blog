import catchAsync from '../utils/catchAsync';
import * as express from 'express';
import UserModel from '../models/userModel';
import  AppError from '../utils/appError';
exports.createNewUser = catchAsync( async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const {username, email, password, confirmPassword} = req.body;
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
        // await new Email(newUser, url).sendWelcome();
        // createSendToken(newUser, 201, req, res);






        
    })