import express from 'express';
import * as authController from '../controllers/authController';


const userRouter = express.Router();
userRouter.post('/loginUser', authController.loginUser);
userRouter.post('/logoutUser', authController.logoutUser);
userRouter.post('/forgetPassword', authController.forgetPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
userRouter.post('/createNewUser', authController.createNewUser);

export default userRouter;