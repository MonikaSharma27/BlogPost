import signUp, { googleLogin, login } from "../Controller/user.controller.js";
import express from "express";


const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/google", googleLogin)



export default router;