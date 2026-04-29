import prisma from "../repositories/prismaClient.js";

export const createEvent = async (userId, data) => {
  const venue = await prisma.venue.findUnique({
    where: { id: data.venueId }
  });

  if (!venue) {
    throw new Error("VenueNotFound");
  }

  if (venue.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.event.create({
    data: {
      userId,
      venueId: data.venueId,
      title: data.title,
      description: data.description,
      eventDate: new Date(data.eventDate),
      startTime: data.startTime,
      endTime: data.endTime
    }
  });
};

export const getUserEvents = async (userId) => {
  return await prisma.event.findMany({
    where: { userId },
    include: {
      venue: true
    }
  });
};

export const getEventById = async (userId, eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      venue: true,
      invitations: true
    }
  });

  if (!event) throw new Error("NotFound");
  if (event.userId !== userId) throw new Error("Forbidden");

  return event;
};

export const updateEvent = async (userId, eventId, data) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) throw new Error("NotFound");
  if (event.userId !== userId) throw new Error("Forbidden");

  return await prisma.event.update({
    where: { id: eventId },
    data: {
      venueId: data.venueId,
      title: data.title,
      description: data.description,
      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
      startTime: data.startTime,
      endTime: data.endTime
    }
  });
};

export const deleteEvent = async (userId, eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });

  if (!event) throw new Error("NotFound");
  if (event.userId !== userId) throw new Error("Forbidden");

  return await prisma.event.delete({
    where: { id: eventId }
  });
};