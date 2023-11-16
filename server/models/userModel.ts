import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Model, Schema, model, CallbackWithoutResultAndOptionalError} from 'mongoose';

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
    createPasswordResetToken: () =>Promise<string>
}

const UserSchema = new Schema<UserSchemaType>({
    email:{
        type:String,
        required: true,
        unique: true,
        minlength: 4
    },
    name:{
        type:String,
        required: true,
        minlength: 3,
        maxLength: 12
    },
    surname:{
        type:String,
        required: true,
        minlength: 3,
        maxLength: 15
    },
    password:{
        type: String,
        required: true,
        minlenght: 8,
        select: false
    },
    confirmPassword:{
        type: String,
        required: true,
        select: false ,
        minlenght: 8,
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
    },
    avatar:{
        type:String
    }
})

UserSchema.methods.createPasswordResetToken = function(){
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
const UserModel: Model<UserSchemaType> = model('Users', UserSchema);

export default UserModel;