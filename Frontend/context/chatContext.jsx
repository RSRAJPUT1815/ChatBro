import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const chatContext = createContext();
export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMassages, setUnseenMassages] = useState({})

    const { socket, axios } = useContext(AuthContext)

    // function to get all users for sidebar
    const getUsers = async()=>{
        try {
            const {data} = await axios.get('/api/message/users');
            if(data.success){
                setUsers(data.users);
                setUnseenMassages(data.unseenMassages);

            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to get messages for selected user
    const getMessages = async(userId)=>{
        try {
            const {data} = await axios.get(`/api/message/${userId}`)
            if(data.success){
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to send message to selected user
    const sendMessage = async(messageData)=>{
        try {
            const {data} = await axios.post(`/api/message/send/${selecteduser._id},` , messageData)
            if (data.success) {
                setMessages((prevMessage)=>[...prevMessage, data.newMessage]);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to message for selected user
    const subscribeToMessages = ()=>{
        if(!socket)return;
        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>[...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }else{
                setUnseenMassages((prevUnseenMassages)=>({
                    ...prevUnseenMassages, [newMessage.senderId] : prevUnseenMassages[newMessage.senderId] ? prevUnseenMassages[newMessage.senderId] + 1 : 1 

                }))
            }
        })
    }

    const value = {

    }
    return (
        <chatContext.Provider value={{}}>
            {children}
        </chatContext.Provider>
    );

};

