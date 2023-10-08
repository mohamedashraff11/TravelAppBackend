import express from "express";
import { register } from "../controllers/tour_controller.js";
import { login } from "../controllers/tour_controller.js";
const router=express.Router();


router.post('/register',register);
router.post('/login',login);

export default router;
