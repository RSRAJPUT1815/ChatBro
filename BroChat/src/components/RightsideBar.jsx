import React from 'react'

const RightsideBar = (props) => {
  return (
    <div  className={` bg-gray-100 p-4 rounded-r-lg ${props.selecteduser? "w-1/4" : "hidden"}`}>
      rsb
    </div>
  )
}

export default RightsideBar
