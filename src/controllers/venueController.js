import * as venueService from "../services/venueService.js";

export const createVenue = async (req, res) => {
  try {
    const venue = await venueService.createVenue(req.user.id, req.body);

    res.status(201).json(venue);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export const getVenues = async (req, res) => {
  try {
    const venues = await venueService.getUserVenues(req.user.id);

    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch venues"
    });
  }
};

export const getVenueById = async (req, res) => {
  try {
    const venue = await venueService.getVenueById(
      req.user.id,
      Number(req.params.id)
    );

    res.status(200).json(venue);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({
        error: "Venue not found"
      });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    res.status(400).json({
      error: "Invalid request"
    });
  }
};

export const updateVenue = async (req, res) => {
  try {
    const venue = await venueService.updateVenue(
      req.user.id,
      Number(req.params.id),
      req.body
    );

    res.status(200).json(venue);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({
        error: "Venue not found"
      });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    res.status(400).json({
      error: "Invalid request"
    });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    await venueService.deleteVenue(req.user.id, Number(req.params.id));

    res.status(200).json({
      message: "Venue deleted successfully"
    });
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({
        error: "Venue not found"
      });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({
        error: "Access denied"
      });
    }

    res.status(400).json({
      error: "Invalid request"
    });
  }
};