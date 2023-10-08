import mongoose from "mongoose";


const bookingSchema =new mongoose.Schema(
    {
        productId:{
            type:mongoose.Types.ObjectId,
           
        },
        userEmail:{
            type:String,
            required:true,
        },
        tourId:{
            type:mongoose.Types.ObjectId,
            required:true,
        },

        fullName:{
            type:String,
            required:true,
        },
        guestsize:{
            type:Number,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
        },
    
    },
    {timestamps:true}  
);

export default mongoose.model("booking",bookingSchema);
