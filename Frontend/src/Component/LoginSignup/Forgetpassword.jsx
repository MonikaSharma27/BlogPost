import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LeftLoginSignup from "./LeftLoginSignup";
import { FaUserLarge } from "react-icons/fa6";
import axiosInstance from '../../../axios';
import { toast, Toaster } from "react-hot-toast";


const Forgetpassword = () => {


    const handleSubmit =(e) =>{
       e.preventDefault();
        const email = e.target.email.value;
        const userData = { email };
        console.log("User Data:", userData);
        forgotPassword(userData)
    }
    
    const forgotPassword = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/forgot-password", userData);
      console.log("Reset password link sent to your email successfully!", response.data);
      if (response.data) {
        toast.success("Reset password link sent to your email successfully!");
      }
    } catch (error) {
      console.error("Error sending reset link:", error.response.data);
      if (error.response) {
        toast.error("Error sending reset link. Please try again.");
      }
    }
  };


  return (
    <div className=" w-full flex justify-center items-center">
      <div className="w-2/3 hidden md:block ">
        <LeftLoginSignup />
      </div>

      <div className="w-full  md:w-1/3 bg-gradient-to-br from-[#e3e9e4] from-60% to-[#5a7c62] h-screen flex justify-center items-center">
        <div className=" w-[75%] h-[45%]  text-[#325137] ">
          <div className="flex justify-center items-center">
            <FaUserLarge size={45} />
          </div>
          <div className="mt-6 text-center">
            <h1 className="font-bold text-3xl">Forgot-Password</h1>
          </div>

          <form className="mt-9" onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-[#a5c4aa]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-10 bg-[#325137]">
              Submit
            </Button>
          </form>
        </div>
      </div>
       <Toaster />
    </div>
  )
}

export default Forgetpassword