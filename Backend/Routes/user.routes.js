import {signUp, forgetPssword, googleLogin, login, logout, resetPassword } from "../Controller/user.controller.js";
import express from "express";


const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/google", googleLogin);
router.post ("/forgot-password",forgetPssword);
router.post("/reset-password", resetPassword);
router.post ("/logout", logout);




export default router;