import axios from "axios";
import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../Utils/googleConfig.js";
import nodemailer from "nodemailer";

export const signUp = async (req, res) => {
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

    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

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

export const githubLogin = async (req, res) => {
  try {
  } catch (error) {}
};

export const forgetPssword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).send({ error: "User does not exist" });
    }
    const token = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `Click on the link to generate your new password: http://localhost:5173/user/reset-password/?token=${token}`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ message: "Password reset link sent to your email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  console.log("Reset Password Function Called");
  try {
    const { token } = req.query;
    const { password } = req.body;
    if ( !password) {
      return res.status(400 ).send({ error: "password is required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email });
    const newhashPassword = await bcrypt.hash(password, 10);
    user.password = newhashPassword;
    await user.save();
    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "user Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
