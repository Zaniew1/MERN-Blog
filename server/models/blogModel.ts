import { Model, Schema, model, } from 'mongoose';
import UserModel from './userModel';
import { BlogSchemaType } from '../types/blogTypes';

const BlogSchema = new Schema<BlogSchemaType>({
    title:{
        type:String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    summary:{
        type:String,
        required: true,
        minlength: 8,
        maxlength: 150
    },
    content:{
        type:String,
        required: true,
        minlength: 100,
    },
    contentCategory:{
        required: true,
        type:String,
        minlength: 4,
        maxlength: 50,
    },
    mainPicture:{
        type: String
    },
    creationDate:{
        default:(new Date().getTime()),
        type: Number,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref: UserModel
    }
})

const BlogModel: Model<BlogSchemaType> = model("Blog", BlogSchema);

export default BlogModel;
