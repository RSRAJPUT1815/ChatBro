import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {

  const { authUser, updateProfile } = useContext(AuthContext)
  const [selectedimg, setselectedimg] = useState(null);
  const navigate = useNavigate();
  const [Name, setName] = useState(authUser.fullName)
  const [bio, setbio] = useState(authUser.bio)

  const handelsub = async (e) => {
    console.log("hi12321");
    e.preventDefault();
    if(!selectedimg){
      await updateProfile({fullName: Name , bio});
      navigate("/")
      return;
    }
    const render = new FileReader();
    render.readAsDataURL(selectedimg);
    render.onload = async ()=>{
      const base64Image = render.result;
      await updateProfile({profilePic: base64Image ,fullName: Name , bio});
      console.log(updateProfile);
      navigate("/") 
    }

  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className=' w-5/6 max-w-2xl text-gray-800 bg-gray-300 p-6 rounded-lg shadow-lg  flex  items-center justify-between gap-4 max-sm:flex-col-reverse'>
        <form className="flex flex-1 flex-col gap-5 p-10 " onSubmit={(e) => {handelsub(e)}}>
          <h3 className='text-lg font-semibold'>Profile Information</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => { setselectedimg(e.target.files[0]) }} type="file" id="avatar" accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon} alt="profile" className={`w-12 h-12 ${selectedimg && "rounded-full"} `} />
            Upload Profile Picture
          </label>
          <input onChange={(e) => setName(e.target.value)} value={Name} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Your Name' required />
          <textarea onChange={(e) => setbio(e.target.value)} value={bio} className='py-2 px-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio' rows={4} required />
          <button className='py-3 bg-gradient-to-r from-purple-500 to-violet-800 text-white rounded-md cursor-pointer'>Update Profile</button>


        </form>
        <img src={authUser.profilePic || assets.logo_icon} alt="profile" className={`max-w-44 aspect-square  mx-10 max-sm:mt-10 ${authUser.profilePic && "rounded-full"}`} />
      </div>
    </div>
  )
}

export default Profile
