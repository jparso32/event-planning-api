import express from "express";
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue
} from "../controllers/venueController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createVenue);
router.get("/", authenticateToken, getVenues);
router.get("/:id", authenticateToken, getVenueById);
router.put("/:id", authenticateToken, updateVenue);
router.delete("/:id", authenticateToken, deleteVenue);

export default router;