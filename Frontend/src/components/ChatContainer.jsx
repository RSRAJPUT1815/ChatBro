import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { msgTimeFormate } from '../lib/utils';
import { chatContext } from '../../context/chatContext';
import { AuthContext } from '../../context/AuthContext';

const ChatContainer = () => {

  const {messages , selectedUser ,setSelectedUser , sendMessage , getMessages} = useContext(chatContext)
  const {authUser, onlineUser} = useContext(AuthContext)
 // handle send message
  const [input , setInput] = useState("")
  const handleSendMessages = async(e)=>{
    e.preventDefault();
    if(input.trim() === "")return null;
    await sendMessage({text:input.trim()})
    setInput("")
  }

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [])


  return props.selecteduser ? (
    <div className={`w-1/2 h-full overflow-scroll relative  bg-gray-200 p-4 ${props.selecteduser ? "rounded-none" : "rounded-r-lg"}  `}>
      {/* header part */}
      <div className='flex items-center  mx-4 py-3 gap-3 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="user-profile" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-black flex items-center gap-2'>
        Martin Johnson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={() => props.setSelecteduser(null)} src={assets.arrow_icon} alt="arrow" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="help_icon" className='max-md:hidden max-w-5 bg-gray-700 rounded-full' />
      </div>
      {/* chat area */}
      <div className='flex flex-col gap-3 mt-4 px-4 h-[calc(100%-101px)] overflow-y-scroll'>
        {messagesDummyData.map((message, index) => {
          return (
            <div key={index} className={`flex items-end justify-end gap-3 ${message.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}>
              {message.image ? (
                <img src={message.image} alt="image" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ) : (
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500 text-white ${message.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-br-none " : "rounded-bl-none "}`}>
                  {message.text}
                </p>
              )}
              <div className='text-center text-sm'>
                <img src={message.senderId === "680f50e4f10f3cd28382ecf9" ? assets.avatar_icon : assets.profile_martin} alt="profilepic" className='w-7 rounded-full' />
                <p className='text-gray-500'>{msgTimeFormate(message.createdAt)}</p>
              </div>
            </div>
          )
        })}
        <div ref={scrollRef}></div>
      </div>
      {/* input area */}
      <div className='absolute bottom-0 left-0 right-0 bg-gray-200 p-4 flex items-center gap-3'>
        <div className='flex flex-1 items-center bg-gray-400 gap-3 px-3 rounded-full'>
          <input value={input} onChange={(e)=>{setInput(e.target.value)}} onKeyDown={(e)=>e.key === "Enter" ? handleSendMessages(e) : null} type="text" placeholder="Sand a massage" id="msginput" className='flex-1 bg-gray-400 text-sm p-3 border-none rounded-lg outline-none text-black placeholder-gray-600 font-semibold' />
          <input type="file" name="image" id="image" accept='image/png , image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="galleryImage" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img onClick={handleSendMessages} src={assets.send_button} alt="buttonImg" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='flex-col w-1/2 max-md:hidden flex items-center justify-center gap-3 bg-gray-200 p-4 rounded-r-lg'>
      <img src={assets.logo_icon} alt="logo-icon" className='max-w-16' />
      <p className='text-xl font-medium text-black'>Chat anytime , anywhere </p>
    </div>
  )
}

export default ChatContainer
