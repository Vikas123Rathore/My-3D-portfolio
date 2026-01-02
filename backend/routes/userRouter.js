import express from "express";
import { login, logout, getUser, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout); // Auth removed
router.get("/portfolio/me", getUser); // Public Access

// 👇 New Update Route (Bina login ke chalega for now)
router.put("/update/me", updateProfile);

export default router;