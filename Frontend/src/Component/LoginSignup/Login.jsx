import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LeftLoginSignup from "./LeftLoginSignup";
import { FaUserLarge } from "react-icons/fa6";
import logo from "../../../public/googlelogo.png";
import axiosInstance from "../../../axios";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userData = { email, password };
    console.log("User Data:", userData);
    loginUser(userData);
  };

  const loginUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/user/login", userData);
      console.log("User Login successfully:", response.data);
      if (response.data) {
        toast.success("Login successfully");
      }
    } catch (error) {
      console.error("Error logging user:", error.response.data);
      if (error.response) {
        toast.error("Error:" + error.response.data);
      }
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   const response = await axiosInstance.get("/user/google");
    //    toast.success("Redirecting to Google login...");
    //   window.location.href = response.data.url;
    // } catch (error) {
    //   console.error("Error during Google login:", error);
    //   toast.error("Google login failed. Please try again.");
    // }
     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/user/google&response_type=code&scope=email profile`;
    window.location.href = googleAuthUrl;
  }




  return (
    <div className=" w-full flex justify-center items-center">
      <div className="w-2/3 hidden md:block ">
        <LeftLoginSignup />
      </div>

      <div className="w-full  md:w-1/3 bg-gradient-to-br from-[#e3e9e4] from-60% to-[#5a7c62] h-screen flex justify-center items-center">
        <div className=" w-[75%] h-[60%]  text-[#325137] ">
          <div className="flex justify-center items-center">
            <FaUserLarge size={45} />
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-4xl">Login</h1>
            <p className="text-sm flex items-center gap-2">
              New user?{" "}
              <Link
                to="/Signup"
                className="font-semibold text-lg  flex items-center justify-center gap-1"
              >
                Signup <FaArrowRight />{" "}
              </Link>
            </p>
          </div>
          <form className="mt-4 " onSubmit={handleSubmit}>
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

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-[#a5c4aa]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-10 bg-[#325137]">
              Login
            </Button>
          </form>
          <div>
            <Button variant="outline" className="w-full mt-3 " onClick={handleGoogleLogin}>
              <img
                src={logo}
                alt="Google Logo"
                className="w-6 h-6 inline mr-2"
              />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
