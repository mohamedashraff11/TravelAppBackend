import mongoose from "mongoose";


const tourSchema =new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },

        city:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        distance:{
            type:Number,
            required:true,
        },
        photo:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        maxGroupSize:{
            type:Number,
            required:true,
        },
        reviews:[
            {
            type:mongoose.Types.ObjectId,
            ref :"Review" 
            }
        ],
        featured:{
            type:Boolean,
            default:false,
        },
        rate:{
            type:String,
            required:true,
        },
        price:{
            type:String,
            required:true,
        },
    },
    {timestamps:true}  
);


export default mongoose.model("tour",tourSchema);
// module.exports = mongoose.model("tour", tourSchema);

// "title":"midnights mass",
// "city":"suez",
// "address":"address",
// "distance":110,
// "photo":"photo",
// "desc":"desc",
// "maxGroupSize":110,
// "reviews":[],
// "featured":true