import express from "express";
import {
  createInvitation,
  getInvitations,
  getInvitationById,
  updateInvitation,
  deleteInvitation
} from "../controllers/invitationController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createInvitation);
router.get("/", authenticateToken, getInvitations);
router.get("/:id", authenticateToken, getInvitationById);
router.put("/:id", authenticateToken, updateInvitation);
router.delete("/:id", authenticateToken, deleteInvitation);

export default router;