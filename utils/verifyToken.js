
import jwt from "jsonwebtoken"

// const verifyToken=(req,res,next)=>{
//     const accesstoken =req.cookie.token

//     if(!verifyToken){
//         return res.status(401).json({success:false,message:"you are not authorize"})
//     }

//     jwt.verify(verifyToken,"mohamed",(err,user)=>{
//         if(err){
//             return res.status(401).json({success:false,message:"token is invalid"}) 
//         }
//         req.user=user
//         next()
//     })  
// }

// export const verifyUser=(req,res,next)=>{
//     verifyToken(req,res,next,
//         ()=>{
//         if(req.user.id==req.params.id){next()}
//         else{
//       return res.status(401).json({success:false,message:"token is invalid"}) }
   
//     })
// }


// export const verifyAdmin=(req,res,next)=>{
//     verifyToken(req,res,next,
//         ()=>{
//         if(req.user.isAdmin==true){next()}
//         else{
//             return res.status(401).json({success:false,message:"token is invalid"}) }
   
//     })
// }




export const verify=(req, res, next)=> {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, "mohamed", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      if(req.user = user){
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

