import React, { useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import ChatContainer from '../components/ChatContainer'
import RightsideBar from '../components/RightsideBar'

const Home = () => {
  const [selecteduser, setSelecteduser] = useState(false)
  return (
    <div className='bg-gray-300 h-screen flex items-center justify-center'>
      <div className='bg-white w-3/4 h-5/6 rounded-lg shadow-lg flex overflow-hidden'>
        <LeftSideBar selecteduser={selecteduser} setSelecteduser={setSelecteduser} />
        <ChatContainer selecteduser={selecteduser} setSelecteduser={setSelecteduser} />
        <RightsideBar selecteduser={selecteduser} setSelecteduser={setSelecteduser} />
      </div>
    </div>
  )
}

export default Home
