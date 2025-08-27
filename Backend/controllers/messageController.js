import Message from "../models/message.js";
import cloudinary from "../lib/cloudinary.js";
import {io,userSocketMap} from "../server.js";
import User from "../models/User.js";



//get all users expect the loggin user
export const getUserinSideBar = async (req, res) => {
    try {
        const userid = req.user._id;
        
        const filterUser = await User.find({ _id: { $ne: userid } }).select('-password')

        //count unseen messages
        const unseenMessages = {}
        const promise = filterUser.map(async (user) => {
            const message = await Message.find({ senderId: user._id, receiverId: userid, seen: false })
            if (message.length > 0) {
                unseenMessages[user._id] = message.length
            }
        })

        await Promise.all(promise)

        res.status(200).json({ success: true, users: filterUser, unseenMessages });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//get all msg for selected user
export const getAllMessages = async (req, res) => {
    try {
        const { id : selectedUserId} = req.params;
        const myId =req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId: selectedUserId},
                {senderId:selectedUserId,receiverId: myId}
            ]
        })
        await Message.updateMany({senderId:selectedUserId, receiverId:myId},{seen:true});
        res.json({ success: true, messages });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//mark all messages as seen
export const markAllMessagesAsSeen = async (req ,res)=>{
    try {
        const {id }= req.params;
        await Message.findByIdAndUpdate(id ,{seen:true})
        res.json({success:true})
    } catch (error) {
         console.log(error.message);
        res.json({ success: false, message: error.message })
    }

}


//sand message to selected user

export const sendMessage = async (req, res) => {
    try {
        const {text ,image} = req.body;

        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imgUrl;
        if(image){
            const uploadResponce = await cloudinary.uploader.upload(image,)
            imgUrl = uploadResponce.secure_url;

        }
        
        const newMessage = await Message.create({
            text,
            image:imgUrl,
            senderId,
            receiverId
        })
        //update last message for sender
        const receiversocketId = userSocketMap[receiverId];
        if(receiversocketId){
            io.to(receiversocketId).emit('newMessage', newMessage)
        }
        res.json({ success: true, newMessage });
    } catch (error) {
          console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
