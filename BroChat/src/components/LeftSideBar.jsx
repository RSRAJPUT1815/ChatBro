import React from 'react'

const LeftSideBar = (props) => {
  return (
    <div  className={` bg-gray-100 p-4 rounded-l-lg ${props.selecteduser? "w-1/2" : "w-1/4"}`}>
      lsb
    </div>
  )
}

export default LeftSideBar
