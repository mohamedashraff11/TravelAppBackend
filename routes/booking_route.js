import express from "express";
import { createBooking } from "../controllers/tour_controller.js";

const router=express.Router();


router.post('/createBooking',createBooking);


export default router;
