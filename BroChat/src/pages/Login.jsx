import React, { useState } from 'react'
import assets from '../assets/assets'

const Login = () => {
  const [currState, setCurrState] = useState("Sing up");
  const [FullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [bio, setbio] = useState("");
  const [password, setPassword] = useState("");
  const [dataSubmited, setdataSubmited] = useState(false);
  const onsubmitHandeler = (e)=>{
    e.preventDefault();
    
    if (currState === "Sing up" && !dataSubmited) {
        setdataSubmited(true);
        return;
    }

  }


  return (
    <div className='min-h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col '>
      {/* left */}
      <img src={assets.logo_big} alt="logo?Img" className='w-[min(30vh,250px)]' />
      {/* Right */}
      <form onSubmit={(e)=>onsubmitHandeler(e)} action=" " className='border-2 bg-gray-400 text-gray-900 border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='text-xl font-medium flex justify-between items-center'>
          {currState}
          {dataSubmited && <img onClick={()=>setdataSubmited(false)} src={assets.arrow_icon} alt="Arrow" className='w-5 cursor-pointer' />}
        </h2>
        {currState === "Sing up" && !dataSubmited && (
          <input onChange={(e)=>setFullName(e.target.value)} value={FullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />
        )}
        {
          !dataSubmited && (
            <>
              <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Email' required/>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Password' required/>
            </>
          )
        }
        {
          currState === "Sing up" && dataSubmited && (
            <textarea onChange={(e)=>setbio(e.target.value)} value={bio} className='py-4 px-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'  placeholder='Provide a short bio' required/>
          )
        }

        <button className='py-3 bg-gradient-to-r from-purple-500 to-violet-800 text-white rounded-md cursor-pointer'>{currState === "Sing up"? "Create Account" : "Login Now"}</button>
        <div className='flex items-center gap-2 text-sm text-gray-800'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          {currState === "Sing up" ? (
            <p className='text-gray-600 text-sm'>Already have an account? <span onClick={()=>{setCurrState("Login") ; setdataSubmited(false)}} className='text-violet-500 font-medium cursor-pointer'>Login</span>.</p>
          ) : (
            <p className='text-gray-600 text-sm'>Create an account <span onClick={()=>{setCurrState("Sing up") }} className='text-violet-500 font-medium cursor-pointer'>Click here</span></p>
          )}
        </div>
        

      </form>
    </div>
  )
}

export default Login
