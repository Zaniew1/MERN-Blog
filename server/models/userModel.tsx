import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
// import crypto from 'crypto'

type UserSchemaType = {
    email: string, 
    password: string,
    confirmPassword:string,
    newsletter: boolean
}

const UserSchema = new mongoose.Schema<UserSchemaType>({
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
        validate:{
            validator: function(el:string ){
                return el === this.password; 
            },
            message: "Password are not the same"
        },
        minlenght: 8,
    },
    newsletter:{
        type:Boolean
    }
})


UserSchema.methods.comparePasswords = async function( typedPassword:string, databasePassword:string){
    // this function compares two passwords, one password is hashed, one is not,
    // comparizon is made by hashing first password and then comparing both hashed passwords
    return await bcrypt.compare(typedPassword, databasePassword);
}
UserSchema.pre('save' , async function(next){
    // isModified is mongoose function
    if(!this.isModified('password')) return next();
    // 12 value stands for how strong encryption will be
     this.password = await bcrypt.hash(this.password, 12); 
     this.confirmPassword = '';
    next(); 
})

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;