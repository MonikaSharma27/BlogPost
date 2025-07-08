import React from 'react'
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import LeftLoginSignup from './LeftLoginSignup'



const Login = () => {
  return (
  <div className=" w-full flex justify-center items-center">
    <div className="w-2/3  ">
        <LeftLoginSignup />
      </div>

      <div className="w-1/3">
           <div className=' h-screen flex justify-center items-center'>
      <div className='w-[60%] h-[50%] ' >
    <Card className="w-full max-w-sm h-full">
      <CardHeader >
        <CardTitle className=" text-3xl ">Login</CardTitle>
        <p>New user? <Link to="/Signup">Create an account</Link></p>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
      </div>
     
      
          </div>
      </div>
          
    </div>
  )
}

export default Login