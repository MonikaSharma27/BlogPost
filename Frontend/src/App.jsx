import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Signup from './Component/LoginSignup/Signup'
import Login from './Component/LoginSignup/Login'
import Forgetpassword from './Component/LoginSignup/Forgetpassword'
import ResetPassword from './Component/LoginSignup/ResetPassword'



const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgot-password' element={<Forgetpassword/>}/>
        <Route path='/user/reset-password' element={<ResetPassword/>}/>
      </Routes>
       
    </div>
  )
}

export default App
