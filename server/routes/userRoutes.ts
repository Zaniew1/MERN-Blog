import express from 'express';
import * as authController from '../controllers/authController';


const userRouter = express.Router();
userRouter.post('/loginUser', authController.loginUser);
userRouter.post('/logoutUser', authController.logoutUser);
userRouter.post('/forgetPassword', authController.forgetPassword);
userRouter.post('/changePassword', authController.changePassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
userRouter.post('/createNewUser', authController.createNewUser);
userRouter.post('/subscribeNewsletter', authController.subscribeNewsletter);
userRouter.get('/profile', authController.myProfile);

export default userRouter;