import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

dotenv.config();


//Creating express app and http server
const app = express();
const server = http.createServer(app);

//Initializing socket.io
export const io = new Server(server,{
    cors:{
        origin:"*",    }
})

//store online users
export const userSocketMap = {}; // userId: socketId

//Socket.io connection hendler
io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userID;
    console.log("userConnected");
    if (userId) {
        userSocketMap[userId] = socket.id;
    }


    //Emit all online users to connected client 
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    socket.on('disconnect', ()=>{
        console.log('userhi Disconnected');
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
    
    
})

//Middleware
app.use(express.json({ limit: "8mb" }));
app.use(cors());


app.use("/api/status", (req,res)=>res.send("Server is ON")) 
//Importing routes
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

//connect to mongoDB
await connectDB();

if (process.env.NODE_ENV === "production") {
   
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})
}
 //Export server for vercel
export default server;