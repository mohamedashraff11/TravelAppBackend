import mongoose from "mongoose";


const reviewSchema =new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },

        reviewText:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        photo:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}  
);

export default mongoose.model("review",reviewSchema);
