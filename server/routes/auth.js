import express from "express";
import { login } from "../controllers/auth.js";

// Setup Routes
const router = express.Router();

// Login
router.post("/login", login);

export default router;