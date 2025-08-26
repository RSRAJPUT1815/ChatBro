import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import assets, { userDummyData } from '../assets/assets';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const LeftSideBar = (props) => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  return (
    
      <div className={` bg-gray-700 p-4 rounded-l-lg ${props.selecteduser ? "w-1/4" : "w-1/2"}`}>
        <div className='pb-5'>
          <div className='flex items-center justify-between '>
            <img src="/src/assets/logo.png" alt="logo" className='max-w-40 ' />
            <div className='relative py-2 group'>
              <img src="/src/assets//menu_icon.png" alt="menu" className='max-h-5 cursor-pointer' />
              <div className='absolute right-0 top-8 z-10  bg-gray-800 text-white p-2 rounded-lg hidden group-hover:block'>
                <Link to={"/profile"} className='text-xs cursor-pointer'>Edit Profile</Link>
                <hr className='my-2 border-t border-gray-500 ' />
                <p className='text-xs cursor-pointer' onClick={()=>{logout();}} >Logout</p>
              </div>
            </div>
          </div>
          <div className='bg-purple-900 flex items-center gap-2 mt-3 py-3 px-4 rounded-full'>
            <img src="/src/assets/search_icon.png" alt="search_icon" className='w-3 ' />
            <input type="text" name="friends" id="friends" className='bg-transparent border-none outline-none text-white text-xs placeholder:text-gray-400 flex-1 ' placeholder='Search user...'/>
          </div>
        </div>

        <div className='flex flex-col gap-3 mt-5'>
          {userDummyData.map((user,index)=>{
            return (
              <div key={index} className={`relative flex items-center gap-2 p-2 rounded cursor-pointer max-sm:text-sm hover:bg-gray-600 ${props.selecteduser._id === user._id && ''} ` } onClick={()=>props.setSelecteduser(user)}>
                <img src={user?.profilePic || assets.avatar_icon} alt="user-profile" className='w-10 aspect-[1,1] rounded-full ' />
                <div className='flex flex-col gap-1 ml-2'>
                  <p className='text-white text-xs font-semibold'>{user?.fullName}</p>
                  {index < 3 ?
                    <span className='text-green-400 text-xs'>Online</span>
                    :
                    <span className='text-gray-400 text-xs'>Offline</span>
                  }
                </div>
                {
                  index >= 2 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500'>{index}</p>
                }
              </div>
            )
          })}
        </div>
      </div>

  )
}

export default LeftSideBar
