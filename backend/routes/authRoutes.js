import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/authController.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/users", authLimiter, getUsers);

export default router;