import mongoose from "mongoose";
//function to connect to mongodb

export const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log('mongoDb is connected'));
        await mongoose.connect(`${process.env.MONGO_URI}/BroChat`)
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
} 