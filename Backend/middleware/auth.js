import User from "../models/User.js";


//middleware to protect routes


export const auth = async (req, res, next) => {
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

//conteoller to check if the user is authenticated

export const isAuth = (req ,res)=>{
    res.json({success:true, user:req.user, message:"User is authenticated"})
    
} 