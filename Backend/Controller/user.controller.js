import axios from "axios";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../Utils/googleConfig.js";


const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    let token = jwt.sign({ email, id: newUser._id }, process.env.JWT_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res.status(201).json({ message: "user created Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export default signUp;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1
      /userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

    const { email, name } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
      const newUser = await new User({
        name,
        email,
      });
      user = await newUser.save();
    }
    const token = jwt.sign({ email, _id: user._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res.status(200).json({
      message: "Login successful",
      user: { name, email, _id: user._id },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



export const githubLogin = async (req, res) =>{
  try{
    
      

  } catch(error){

  }
}
