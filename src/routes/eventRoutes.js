import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createEvent);
router.get("/", authenticateToken, getEvents);
router.get("/:id", authenticateToken, getEventById);
router.put("/:id", authenticateToken, updateEvent);
router.delete("/:id", authenticateToken, deleteEvent);

export default router;