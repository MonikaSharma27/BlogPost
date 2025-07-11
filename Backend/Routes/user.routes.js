import {signUp, forgetPssword, googleLogin, login, logout, resetPassword } from "../Controller/user.controller.js";
import express from "express";


const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleLogin);
router.post ("/forget-password",forgetPssword);
router.post("/reset-password/:token", resetPassword);
router.post ("/logout", logout);




export default router;