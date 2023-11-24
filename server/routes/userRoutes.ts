import * as authController from '../controllers/authController';
import {protect} from '../middleware/authMiddleware'
import express from 'express';
// import {protect} from '../middleware/authMiddleware'
import { uploadUserPhoto, resizeUserPhoto } from '../middleware/uploadPhotoMiddleware';
const userRouter = express.Router(); 

userRouter.post('/createNewUser', authController.createNewUser);
userRouter.post('/loginUser', authController.loginUser);
userRouter.post('/forgetPassword', authController.forgetPassword);
userRouter.post('/logoutUser', authController.logoutUser);
userRouter.get('/profile', protect,  authController.getMe);
userRouter.post('/changePassword', authController.changePassword);
userRouter.post('/editUser', uploadUserPhoto, resizeUserPhoto,   authController.editUser);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
    
export default userRouter;