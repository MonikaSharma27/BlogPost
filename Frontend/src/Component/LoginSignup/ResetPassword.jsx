import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LeftLoginSignup from "./LeftLoginSignup";
import { FaUserLarge } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../axios';
import { toast, Toaster } from "react-hot-toast";



const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert("Passwords do not match. please enter the same password");
            return;
        }
        const userData = { password};
        console.log("User Data:", userData);
        resetPassword(userData)
    }

   const resetPassword = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/reset-password?token=${token}`, userData);
      console.log("Password reset successfully!", response.data);
      if (response.data) {
        toast.success("Password reset successfully!");
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      if (error.response) {
        toast.error("Error resetting password. Please try again.");
      }
    }
  };


  return (
     <div className=" w-full flex justify-center items-center">
      <div className="w-2/3 hidden md:block ">
        <LeftLoginSignup />
      </div>

      <div className="w-full  md:w-1/3 bg-gradient-to-br from-[#e3e9e4] from-60% to-[#5a7c62] h-screen flex justify-center items-center">
        <div className=" w-[75%] h-[50%]  text-[#325137] ">
          <div className="flex justify-center items-center">
            <FaUserLarge size={45} />
          </div>
          <div className="mt-6 text-center">
            <h1 className="font-bold text-3xl">Reset-Password</h1>
          </div>

          <form className="mt-9" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-[#a5c4aa]"
                />
              </div>

              <div className="grid gap-2">
                  <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="bg-[#a5c4aa]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-10 bg-[#325137]">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
       <Toaster />
    </div>
  )
}

export default ResetPassword