import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightsideBar = (props) => {
  return props.selecteduser && (
    <div className={` bg-gray-700 text-white w-1/4  relative overflow-y-scroll  rounded-r-lg ${props.selecteduser ? "max-md:hidden" : ""}`}>

      <div className='pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={props.selecteduser?.profilePic || assets.avatar_icon} alt="profilePic" className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='px-10 text-sm font-medium mx-auto flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {props.selecteduser.fullName}</h1>
        <p>{props.selecteduser.bio}</p>
      </div>
      <hr className='my-3 border-gray-400' />
      <div>
        <p className='text-center'>Media</p>
        <div className='mt-2 max-h-[200] overflow-y-scroll grid grid-cols-2 gap-1 opacity-90'>
          {imagesDummyData.map((img, index) => {
            return (
              <div className='cursor-pointer rounded' key={index} onClick={() => window.open(img)}>
                <img src={img} alt="img" className='rounded-md h-full m-1' />
              </div>
            )
          })}
        </div>
      </div>
      <button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-20 py-2 rounded-full cursor-pointer font-light'>
        Logout
      </button>
    </div>
  )
}

export default RightsideBar
