import User from "../models/User.js";
import Jwt from "jsonwebtoken";

//middleware to protect routes


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.ID).select("-password");

        if(!user) return res.json({success:false, message:"Unauthorized"})
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}

