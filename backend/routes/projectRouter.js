import express from "express";
import { 
  addNewProject, 
  updateProject, 
  deleteProject, 
  getAllProjects, 
  getSingleProject 
} from "../controllers/projectController.js"; 
// 👆 DHYAN DENA: Ye import 'projectController.js' se hona chahiye, 'softwareApplicationController.js' se nahi.

const router = express.Router();

router.post("/add", addNewProject);
router.delete("/delete/:id", deleteProject);
router.put("/update/:id", updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router;