import express from 'express';
import * as authController from '../controllers/authController';
import {protect} from '../middleware/authMiddleware'
const userRouter = express.Router();


userRouter.post('/createNewUser', authController.createNewUser);
userRouter.post('/loginUser', authController.loginUser);
userRouter.post('/forgetPassword', authController.forgetPassword);
userRouter.post('/logoutUser',protect, authController.logoutUser);
userRouter.get('/profile', protect, authController.getMe);
userRouter.post('/changePassword',protect, authController.changePassword);
userRouter.post('/editUser',protect, authController.editUser);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

export default userRouter;