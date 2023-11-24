
import catchAsync from '../utils/catchAsync';
import  { RequestHandler,Request, Response, NextFunction, json } from 'express';
import  AppError from '../utils/appError';
import 'dotenv/config';
import  fs  from 'fs';
import path from 'path'
import { NewsletterInfoType } from '../types/blogTypes';


export const newsletter: RequestHandler<{email:string}> = catchAsync( async (req: Request, res: Response, next:  NextFunction) => {
    const {email} = req.body as NewsletterInfoType
    if(!email) return next(new AppError('There is no email', 404));
    const newMail:NewsletterInfoType = {
        email,
        subscriptionDate: new Date()
    }
    const filePath = path.join(__dirname, '../cacheData', 'newsletter.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return next(new AppError('Error reading file:', 404))
      try {
        const existingEmails = JSON.parse(data);
        const containsEmail = existingEmails.some((obj:NewsletterInfoType) => obj.email === newMail.email);
            if(!containsEmail){
                existingEmails.push(newMail);
                const updatedData = JSON.stringify(existingEmails, null, 2);
                fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                    if (err) {
                        return next(new AppError('Error writing file:'+err, 404))
                    }
                    res.status(200).json({
                        status: "success",
                        email
                    });
                });
            }else  return next(new AppError('This email already exsits', 404))
        
      } catch (parseError) {
        return next(new AppError(`${parseError}`, 404))
      }
        
})
})
