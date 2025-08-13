import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'


function App() {

  return (
    <div className=''>
    {/* Adding Routes */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        
      </Routes>
    </div>
  )
}

export default App
