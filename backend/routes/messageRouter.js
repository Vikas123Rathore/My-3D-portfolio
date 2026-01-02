import express from "express";
import { 
  sendMessage, 
  getAllMessages, 
  deleteMessage 
} from "../controllers/messageController.js";

// import { isAuthenticated } from "../middlewares/auth.js"; // Abhi ke liye Security hata di hai

const router = express.Router();

// 1. Message Bhejna (Public Route - Koi bhi bhej sakta hai)
router.post("/send", sendMessage);

// 2. Saare Messages Dekhna (Ab bina login ke chalega)
router.get("/getall", getAllMessages);

// 3. Message Delete Karna (Ab bina login ke chalega)
router.delete("/delete/:id", deleteMessage);

export default router;