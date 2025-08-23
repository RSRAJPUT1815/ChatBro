import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

//singup new user


export const singup = async (req , res)=>{
    const {email ,fullName ,password , bio}=req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success:false, message:"Please fill  all the fields"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success:false,message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullName,email,password:hashedPassword,bio
        })

        const token = generateToken(newUser._id)
        return res.json({success:true, message:"User created successfully",userData:newUser, token})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message})
    }
}

// controller for login

export const login = async (req , res)=>{
    const{email , password}= req.body;
    try {
        if(!email || !password){
            return res.json({success:false , message:"please fill all fields"
            })
        }
        const user = await User.findOne({email});
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if(!user && !passwordMatch){
            return res.json({success:false , message:"Invalid email or password"})
        }

        const token = generateToken(user._id);
        return res.json({success:true,userData , message:"Login successful", token});
    } catch (error) {
        console.log(error.message );
        return res.json({success:false , message:error.message})
    }
}

//conteoller to check if the user is authenticated

export const isAuth = (req ,res)=>{
    res.json({success:true, user:req.user, message:"User is authenticated"})
    
} 

//controller to update profile details

export const updateProfile = async (req ,res)=>{
    try {
        const {fullName , bio , profilePic} = req.body;
        const userid = req.user._id;
        let updatedUser ;
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userid, {fullName,bio},{new:true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userid,{fullName,bio,profilePic:upload.secure_url},{new:true})
        }
        
        res.json({success:true, message:"Profile updated successfully", userData:updatedUser})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}