import * as eventService from "../services/eventService.js";

export const createEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.user.id, req.body);
    res.status(201).json(event);
  } catch (error) {
    if (error.message === "VenueNotFound") {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await eventService.getUserEvents(req.user.id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(
      req.user.id,
      Number(req.params.id)
    );

    res.status(200).json(event);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Event not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(
      req.user.id,
      Number(req.params.id),
      req.body
    );

    res.status(200).json(event);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Event not found" });
    }

    if (error.message === "VenueNotFound") {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await eventService.deleteEvent(req.user.id, Number(req.params.id));

    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Event not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};