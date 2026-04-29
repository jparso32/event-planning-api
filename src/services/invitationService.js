import prisma from "../repositories/prismaClient.js";

export const createInvitation = async (userId, data) => {
  const event = await prisma.event.findUnique({
    where: { id: data.eventId }
  });

  if (!event) {
    throw new Error("EventNotFound");
  }

  if (event.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.invitation.create({
    data: {
      userId,
      eventId: data.eventId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      rsvpStatus: data.rsvpStatus || "pending"
    }
  });
};

export const getInvitations = async (userId) => {
  return await prisma.invitation.findMany({
    where: {
      userId
    },
    include: {
      event: true
    }
  });
};

export const getInvitationById = async (userId, invitationId) => {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: {
      event: true
    }
  });

  if (!invitation) {
    throw new Error("NotFound");
  }

  if (invitation.userId !== userId) {
    throw new Error("Forbidden");
  }

  return invitation;
};

export const updateInvitation = async (userId, invitationId, data) => {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId }
  });

  if (!invitation) {
    throw new Error("NotFound");
  }

  if (invitation.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.invitation.update({
    where: { id: invitationId },
    data: {
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      rsvpStatus: data.rsvpStatus
    }
  });
};

export const deleteInvitation = async (userId, invitationId) => {
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId }
  });

  if (!invitation) {
    throw new Error("NotFound");
  }

  if (invitation.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.invitation.delete({
    where: { id: invitationId }
  });
};