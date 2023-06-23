import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import verifyToken from "../middleware/auth.js";

// Setup Routes
const router = express.Router();

// Read Single User & Friends
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId/", verifyToken, addRemoveFriend);

export default router;