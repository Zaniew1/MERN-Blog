import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import AppError from './utils/appError';
import  globalErrorHandler from './controllers/errorController';
import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
import utilsRouter from './routes/utilsRoutes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    credentials: true,
    origin:['https://mern-blog-front-two.vercel.app/'],
    methods:["POST", "GET", "PATCH", "DELETE", "PUT"]
}));
app.use(express.json());
app.use(cookieParser());
app.options('*', cors());
app.use('/', userRouter);
app.use('/article', blogRouter);
app.use('/', utilsRouter);

// Creating server
app.use("/images", express.static(__dirname + '/images'));
console.log(__dirname + '/images')
app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server runs good !")
})
app.all('*', (req: Request, res:Response, next: NextFunction)=>{
    next( new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})
app.use(globalErrorHandler);

mongoose.connect(`${process.env.MONGO_DB_PASS}`)
.then(() => console.log('DB connection successful!'));

export default app;