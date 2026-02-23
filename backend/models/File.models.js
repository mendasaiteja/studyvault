import mongoose from "mongoose";

const FileSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    fileUrl:{
        type:String,
        required:true,
    },
    downloadUrl:{
        type:String,
        required:true,
    },
    publicId:{
        type:String,
        required:true,
    },
    uploadedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true}
);
export const File=mongoose.model("File",FileSchema);