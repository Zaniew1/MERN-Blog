import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import AppError from './utils/appError';
import  globalErrorHandler from './controllers/errorController';
// import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
// import View from "grandjs";

const app = express();
mongoose.connect(`${process.env.MONGO_DB_PASS}`);
// View.settings.set("views", "./views")
// We are creating connection with MongoDB Atlas
mongoose.connect(`${process.env.MONGO_DB_PASS}`);
//We allow sending JSON from frontend to backend
app.use(express.json());
// We eliminate a lot of errors
app.use(cors());
app.options('*', cors());
// Creating an endpoint

// app.use('/', userRouter);
app.use('/', blogRouter);

// Creating server
app.listen(3001, ()=>{
    console.log("Server runs good !")
})

app.all('*', (req: express.Request, res:express.Response, next: express.NextFunction)=>{
    next( new AppError(`Cant find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

export default app;