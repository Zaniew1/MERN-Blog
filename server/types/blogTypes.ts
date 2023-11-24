import { Request } from "express"
export type UserSchemaType = {
    _id:string
    email: string, 
    name:string, 
    surname:string,
    password: string,
    confirmPassword:string,
    creationDate: number,
    passwordResetToken?: string,
    passwordResetExpires?: number,
    avatar?:string,
    createPasswordResetToken: () => Promise<string>
}
export type BlogSchemaType = {
    title: string, 
    summary: string,
    content:string,
    contentCategory:string,
    mainPicture: string,
    creationDate?: number,
    creator?:string,
    creatorAvatar?: string,
}

export type EditUserType = {
    id: string,
    avatar: string
    name:string,
    surname: string
}
export interface AuthRequest extends Request {
    user?: UserSchemaType;
}
export type NewUserType = {
    name:string,
    surname:string,
    email: string,
    password:string, 
    confirmPassword:string
}
export type LoginUserType = {
    email: string, 
    password:string
}
export type ChangePasswordType = {
    oldPass:string,
    newPass:string,
    confirmNewPass:string,
    email:string
}
export type NewsletterInfoType = {
    email:string,
    subscriptionDate?: Date
}