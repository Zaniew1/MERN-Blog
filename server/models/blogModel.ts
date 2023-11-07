import { Model, Schema, model, } from 'mongoose';
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
        maxlength: 10000,
    },
    contentCategory:{
        required: true,
        type:String,
        minlength: 4,
        maxlength: 50,
    },
    mainPicture:{
        required: true,
        type: String
    },
    creationDate:{
        default:(new Date().getTime()),
        type: Number,
    },
    creator:{
        type:String,
    },
    creatorAvatar:{
        type: String,
    },
 
})

const BlogModel: Model<BlogSchemaType> = model("Blog", BlogSchema);

export default BlogModel;
