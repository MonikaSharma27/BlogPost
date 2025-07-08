import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Signup from './Component/LoginSignup/Signup'
import Login from './Component/LoginSignup/Login'



const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
       
    </div>
  )
}

export default App
