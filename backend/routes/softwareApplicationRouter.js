import express from "express";
import { 
    addNewApplication, 
    deleteApplication, 
    getAllApplications,
    updateApplication // Import kiya
} from "../controllers/softwareApplicationController.js";

const router = express.Router();

router.post("/add", addNewApplication);
router.delete("/delete/:id", deleteApplication);
router.put("/update/:id", updateApplication); // New Route
router.get("/getall", getAllApplications);

export default router;