import { Request, Response, NextFunction } from 'express';

type ErrorFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default  (errorFunction: ErrorFunction) => {
    return(req:  Request, res:  Response, next: NextFunction)=>{
        errorFunction(req,res,next).catch(err => next(err))
    }
}