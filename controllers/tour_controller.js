import tour from '../models/tour_model.js'
import user from '../models/user_model.js'
import Review from '../models/reviews_model.js'
import booking from '../models/booking_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const createTour =async (req,res)=>{
    const newTour =new tour(req.body)

    try{
        const savedTour=await newTour.save()
        res.status(200).json({success:true,message:"successfully created",data:savedTour})
        
    }
    catch(err){
        res.status(500).json({success:false,message:"faild to create",data:savedTour})
    }
}


export const updateTour=async(req,res)=>{
   const id = req.params.id;
    try{
        const updateTour=await tour.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({
            success:true,
            message:"succesfully updated",
            data:updateTour
        });
    }
    catch(err){
        throw(err);
        res.status(500).json({
            success:false,
            message:"faild to update",
        });
    }
}


export const deleteTour=async(req,res)=>{
    const id = req.params.id;
    try{
        await tour.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"succesfully ",
        });
    }
    catch(err){
        throw(err);
        res.status(500).json({
            success:false,
            message:"faild to delete",
        });
    }
}


export const getSingleTour=async(req,res)=>{
    const id = req.params.id;
    try{
        const tours=await tour.findById(id)
        res.status(200).json({
            success:true,
            message:"succesfully ",
            data:tours
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild ",
        });
    }
}


export const getAllTour=async(req,res)=>{
    try{
        const tours=await tour.find({})
        res.status(200).json({
            success:true,
            message:"succesfully",
            data:tours
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }
}


export const getTourBySearch=async(req,res)=>{

    const city =new RegExp(req.query.city,'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);
    try{
        const tours=await tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}})
        res.status(200).json({
            success:true,
            message:"succesfully",
            data:tours
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }
}


export const getFeaturedTour=async(req,res)=>{

    try{
        const tours=await tour.find({featured:true}).limit(8);
        res.status(200).json({
            success:true,
            message:"succesfully",
            data:tours
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }
}



export const getTourCount=async(req,res)=>{

    try{
        const tourCount=await tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            message:"succesfully",
            data:tourCount
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }
}


export const register=async(req,res)=>{

    try{
         const salt= bcrypt.genSaltSync(10);
         const hash=bcrypt.hashSync(req.body.password,salt)
        const newUser=new user({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });
        await newUser.save();
        res.status(200).json({
            success:true,
            message:"succesfully",
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }


}


export const login=async(req,res)=>{
     const email=req.body.email
    try{
         const User =await user.findOne({email})
      
         if(!User){
            return res.status(404).json({success:false,message:"user not found",})
         }

         const checkcorrectpassword=await bcrypt.compare(req.body.password,User.password);
         if(!checkcorrectpassword){
            return res.status(404).json({success:false,message:"incorrect password or email",})   
         }
     

         const token =jwt.sign(
            {id:User._id,isAdmin: User.isAdmin},
            'mohamed',
            {expiresIn:'15d'}
         );
             const { password, ...info } = User._doc;
             res.status(200).json({ ...info, token });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild",
        });
    }

}

export const createReview=async(req,res)=>{
    const tourId=req.params.tourId
    const newReview=new Review({...req.body})
   try{
    const savedReview=await newReview.save();
    await tour.findByIdAndUpdate(tourId,{$push:{reviews:savedReview._id}})

    res.status(200).json({
        success:true,
        message:"success",
    });
   }
   catch(err){
       throw(err);
       res.status(404).json({
           success:false,
           message:"faild",
       });
   }

}

export const getreview=async(req,res)=>{
    const id = req.params.id;
    try{
        const review=await Review.findById(id)
        res.status(200).json({
            success:true,
            message:"succesfully ",
            data:review
        });
    }
    catch(err){
        throw(err);
        res.status(404).json({
            success:false,
            message:"faild ",
        });
    }
}



export const createBooking=async(req,res)=>{
    const newbooking=new booking(req.body)
   try{
    const savedBooking=await newbooking.save();
    res.status(200).json({
        success:true,
        message:"success",
    });
   }
   catch(err){
       throw(err);
       res.status(404).json({
           success:false,
           message:"faild",
       });
   }

}

