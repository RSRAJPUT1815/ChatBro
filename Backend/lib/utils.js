import jwt from 'jsonwebtoken';

//token generate function

export const generateToken = (ID)=>{
    const token = jwt.sign({ID}, process.env.JWT_SECRET )
    return token;
}