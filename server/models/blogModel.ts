import mongoose from 'mongoose';

type BlogSchemaType = {
    title: string, 
    summary: string,
    content:string,
    mainPicture: string,
    creationDate: number,
    creator?:string,
    creatorAvatar?: string
}

const BlogSchema = new mongoose.Schema<BlogSchemaType>({
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
const BlogModel = mongoose.model("posts", BlogSchema);

export default BlogModel;
