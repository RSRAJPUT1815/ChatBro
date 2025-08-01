import React from 'react'
import assets, { messagesDummyData } from '../assets/assets'

const ChatContainer = (props) => {
  return props.selecteduser ? (
    <div className={`w-1/2 h-full overflow-scroll relative  bg-gray-200 p-4 ${props.selecteduser ? "rounded-none" : "rounded-r-lg"}  `}>
     {/* header part */}
      <div className='flex items-center  mx-4 py-3 gap-3 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="user-profile" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-black flex items-center gap-2'>
          Rohit Singh
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
          <img onClick={()=>props.setSelecteduser(null)} src={assets.arrow_icon} alt="arrow" className='md:hidden max-w-7' />
          <img src={assets.help_icon} alt="help_icon" className='max-md:hidden max-w-5 bg-gray-700 rounded-full' />
      </div>
      {/* chat area */}
      <div className='flex flex-col gap-3 mt-4 px-4 h-[calc(100%-80px)] overflow-y-scroll'>
        {messagesDummyData.map((message, index) => {
          return (
            <div key={index} className={`flex items-end gap-3 ${message.senderId!== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}>
              {message.image ? (
                <img src={message.image} alt="image" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ):(
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500 text-white ${message.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-bl-none" : "rounded-br-none"}`}>
                  {message.text}
                </p>
              )}
              
            </div>
          )
        })}
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
