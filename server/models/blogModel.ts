import mongoose from 'mongoose';

type BlogSchemaType = {
    title: string, 
    summary: string,
    content:string,
    mainPicture: File,
    creationDate: number,
    creator?:string,
    creatorAvatar?: File
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
        type: File
    },
    creationDate:{
        default:(new Date().getTime()),
        type: Number,
    },
    creator:{
        type:String,
    },
    creatorAvatar:{
        type: File,
    },
})
const BlogModel = mongoose.model("posts", BlogSchema);

export default BlogModel;