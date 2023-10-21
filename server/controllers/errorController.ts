import express from 'express';
type ErrorType = {
    statusCode:number,
    status:string,
    message: string
}
export default (err:ErrorType, req:express.Request, res:express.Response, next:express.NextFunction)=>{
    // statusCode equals whatever statusCode is or if there is no status code then its 500
    err.statusCode = err.statusCode || 500;
    // statusCode equals whatever status is or if there is no status  then its error
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
};