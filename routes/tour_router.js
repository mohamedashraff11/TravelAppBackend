import express from "express";
import { createTour } from "../controllers/tour_controller.js";
import { updateTour } from "../controllers/tour_controller.js";
import { deleteTour } from "../controllers/tour_controller.js";
import { getSingleTour } from "../controllers/tour_controller.js";
import { getAllTour } from "../controllers/tour_controller.js";
import { getTourBySearch } from "../controllers/tour_controller.js";
import { getFeaturedTour } from "../controllers/tour_controller.js";
import { getTourCount } from "../controllers/tour_controller.js";
import { verify } from "../utils/verifyToken.js";
const router=express.Router();


router.post('/',createTour);
router.put('/:id',updateTour);
router.delete('/:id',deleteTour);
router.get ('/:id',verify,getSingleTour);
router.get ('/',verify,getAllTour);
router.get ('/search/getTourBySearch',getTourBySearch);
router.get ('/search/getFeaturedTour',getFeaturedTour);
router.get ('/search/getTourCount',getTourCount);

export default router;
// module.exports = router;



// ?city=suez&distance=110&maxGroupSize=110