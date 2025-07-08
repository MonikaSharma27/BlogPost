import React from 'react'
import LeftLoginSignup from './LeftLoginSignup'

const Signup = () => {
  return (
    <div className=" w-full flex justify-center items-center">
    <div className="w-2/3  ">
        <LeftLoginSignup />
      </div>

      <div className="w-1/3">
      <div className=' h-screen flex justify-center items-center'>
            signup card
      </div>
       
      </div>
          
    </div>
  )
}

export default Signup