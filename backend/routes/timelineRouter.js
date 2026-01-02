import express from "express";
import { 
    postTimeline, 
    deleteTimeline, 
    getAllTimelines,
    updateTimeline // Import kiya
} from "../controllers/timelineController.js";

const router = express.Router();

router.post("/add", postTimeline);
router.delete("/delete/:id", deleteTimeline);
router.put("/update/:id", updateTimeline); // New Route
router.get("/getall", getAllTimelines);

export default router;