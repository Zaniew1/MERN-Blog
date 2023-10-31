import { Model, Schema, model, } from 'mongoose';
export type BlogSchemaType = {
    title: string, 
    summary: string,
    content:string,
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
    },
    summary:{
        type:String,
        required: true,
        minlength: 8,
    },
    content:{
        type:String,
        required: true,
        maxlength: 5000,
    },
    mainPicture:{
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
