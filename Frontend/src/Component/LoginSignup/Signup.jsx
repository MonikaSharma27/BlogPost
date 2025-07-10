import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LeftLoginSignup from "./LeftLoginSignup";
import { FaUserLarge } from "react-icons/fa6";
import logo from "../../../public/googlelogo.png";

const Signup = () => {
  return (
     <div className=" w-full flex justify-center items-center">
      <div className="w-2/3 hidden md:block">
        <LeftLoginSignup />
      </div>

      <div className="w-full  md:w-1/3 bg-gradient-to-br from-[#e3e9e4] from-60% to-[#5a7c62] h-screen flex justify-center items-center">
        <div className=" w-[75%] h-[50%]  text-[#325137] ">
          
          <div className="flex justify-center items-center" >
                 <FaUserLarge size={45} />
          </div>
             <div className="mt-4">
              <h1 className="font-bold text-4xl">Sign up</h1>
              <p className="text-sm flex items-center gap-2">
                Have Account? <Link to="/" className="font-semibold text-lg  flex items-center justify-center gap-1">Login <FaArrowRight /> </Link>
              </p>
             </div>
           <form className="mt-4">
               <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                      <Label htmlFor="email">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder=""
                        required
                        className="bg-[#a5c4aa]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="bg-[#a5c4aa]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input id="password" type="password" required  className="bg-[#a5c4aa]"/>
                    </div>

                    </div>
           </form>
          <div className="mt-10">
             <Button type="submit" className="w-full bg-[#325137]">
                  Sign up
                </Button>
                <Button variant="outline" className="w-full mt-3 ">
                  <img src={logo} alt="Google Logo" className="w-6 h-6 inline mr-2" />
                  Login with Google
                </Button>
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default Signup