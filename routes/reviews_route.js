import express from "express";
import { createReview } from "../controllers/tour_controller.js";
import { getreview } from "../controllers/tour_controller.js";
const router=express.Router();


router.post('/:tourId',createReview);
router.get('/:id',getreview);

export default router;
