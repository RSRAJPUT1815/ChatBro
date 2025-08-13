import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { connectDB } from "./lib/db.js";



//Creating express app and http server
const app = express();
const server = http.createServer(app);

//Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());
dotenv.config();


app.use("/api/status", (req ,res)=>res.send("Server is ON"))  

//connect to mongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})