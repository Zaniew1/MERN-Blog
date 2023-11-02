import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import AppError from './utils/appError';
import  globalErrorHandler from './controllers/errorController';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
// import View from "grandjs";

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use('/', userRouter);
app.use('/article', blogRouter);

// Creating server
app.listen(3001, ()=>{
    console.log("Server runs good !")
})

app.all('*', (req: express.Request, res:express.Response, next: express.NextFunction)=>{
    next( new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

mongoose.connect(`${process.env.MONGO_DB_PASS}`)
.then(() => console.log('DB connection successful!'));

export default app;