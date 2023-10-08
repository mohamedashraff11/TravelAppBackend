import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import dotenv from "dotenv";
import mongoose, { set } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tour_router.js"
import authRoute from "./routes/auth_router.js"
import reviewRoute from "./routes/reviews_route.js"
import bookingRoute from "./routes/booking_route.js"
import Client from "socket.io/lib/client.js";


const http=require('http')

dotenv.config();
const app =express();  
const server =http.createServer(app)
const io=require('socket.io')(server);
const port =6000;
const corsOptions={
    origin:true,
    Credential:true
}


app.get('/',(req,res)=>{
    res.send('api is working')
})

mongoose.set("strictQuery",false);
const connect =async ()=>{
   try {
   await mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   })        
      console.log("Mongodb connected !!")
    
    }catch(err){
        console.log("Mongodb connection  failed !!")
    }
}



app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/tours',tourRoute);
app.use('/auth',authRoute);
app.use('/review',reviewRoute);
app.use('/booking',bookingRoute);


io.on("connection",(client)=>{
    console.log("new client connected!")
    console.log(client.id)
    client.on('msg',(data)=>{
        console.log(data)     
        io.emit('res',data)
    })
})

 server.listen(port,()=>{
    connect();
    console.log("server listening on port",port)
})

// const io=require('socket.io')(server);
// io.on("connection",(socket)=>{
//     console.log("connected");
//     console.log(socket.id,"has joined");
//     socket.on("/test",(msg)=>{
//         console.log(msg);
//     })
//     server.listen(port,"0.0.0.0",()=>{
//         console.log("server started")
//     })
// })


// const connectedUser=new set()

// io.on('connection',(socket)=>{
//     console.log("connected",socket.id);
//     io.emit('connected-user',connectedUser.size);
//     connectedUser.add(socket.id);
//     socket.on('disconnected',()=>{
//         console.log("Disconnected",socket.id);
//         connectedUser.delete(socket.id);
//         io.emit('connected-user',connectedUser.size);
//     });
//     socket.on('message',(data)=>{
//         console.log(data);
//         socket.broadcast.emit('message-received',data)
//     })
// })
