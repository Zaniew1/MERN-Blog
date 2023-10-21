import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Model, Schema, model, CallbackWithoutResultAndOptionalError} from 'mongoose';

type UserSchemaType = {
    email: string, 
    password: string,
    confirmPassword:string,
    newsletter: boolean,
    creationDate: number,
    passwordResetToken?: string,
    passwordResetExpires?: number,
}

const UserSchema = new Schema<UserSchemaType>({
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlenght: 8,
    },
    confirmPassword:{
        type: String,
        required: true,
        select: false ,
        minlenght: 8,
    },
    newsletter:{
        type:Boolean
    },
    creationDate:{
       default: (new Date().getTime()),
       type: Number,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Number
    }

})

export const createPasswordResetToken = function(this: UserSchemaType){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
UserSchema.pre('save' , async function(next: CallbackWithoutResultAndOptionalError ){
    // isModified is mongoose function
    if(!this.isModified('password')) return next();
    // 12 value stands for how strong encryption will be
     this.password = await bcrypt.hash(this.password, 12); 
     this.confirmPassword = '';
    next(); 
})
UserSchema.pre('save', function(next: CallbackWithoutResultAndOptionalError){
    if(!this.isModified('password') || this.isNew ) return next();
    // this.passwordChangedAt = Date.now() -1000;
    next();
})
const UserModel: Model<UserSchemaType> = model('User', UserSchema);

export default UserModel;