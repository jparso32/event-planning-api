import * as invitationService from "../services/invitationService.js";

export const createInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.createInvitation(
      req.user.id,
      req.body
    );

    res.status(201).json(invitation);
  } catch (error) {
    if (error.message === "EventNotFound") {
      return res.status(404).json({ error: "Event not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: error.message });
  }
};

export const getInvitations = async (req, res) => {
  try {
    const invitations = await invitationService.getInvitations(req.user.id);

    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
};

export const getInvitationById = async (req, res) => {
  try {
    const invitation = await invitationService.getInvitationById(
      req.user.id,
      Number(req.params.id)
    );

    res.status(200).json(invitation);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Invitation not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};

export const updateInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.updateInvitation(
      req.user.id,
      Number(req.params.id),
      req.body
    );

    res.status(200).json(invitation);
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Invitation not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};

export const deleteInvitation = async (req, res) => {
  try {
    await invitationService.deleteInvitation(
      req.user.id,
      Number(req.params.id)
    );

    res.status(200).json({
      message: "Invitation deleted successfully"
    });
  } catch (error) {
    if (error.message === "NotFound") {
      return res.status(404).json({ error: "Invitation not found" });
    }

    if (error.message === "Forbidden") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(400).json({ error: "Invalid request" });
  }
};