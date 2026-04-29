import prisma from "../repositories/prismaClient.js";

export const createVenue = async (userId, data) => {
  return await prisma.venue.create({
    data: {
      userId,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      capacity: data.capacity
    }
  });
};

export const getUserVenues = async (userId) => {
  return await prisma.venue.findMany({
    where: { userId }
  });
};

export const getVenueById = async (userId, venueId) => {
  const venue = await prisma.venue.findUnique({
    where: { id: venueId }
  });

  if (!venue) {
    throw new Error("NotFound");
  }

  if (venue.userId !== userId) {
    throw new Error("Forbidden");
  }

  return venue;
};

export const updateVenue = async (userId, venueId, data) => {
  const venue = await prisma.venue.findUnique({
    where: { id: venueId }
  });

  if (!venue) {
    throw new Error("NotFound");
  }

  if (venue.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.venue.update({
    where: { id: venueId },
    data: {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      capacity: data.capacity
    }
  });
};

export const deleteVenue = async (userId, venueId) => {
  const venue = await prisma.venue.findUnique({
    where: { id: venueId }
  });

  if (!venue) {
    throw new Error("NotFound");
  }

  if (venue.userId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.venue.delete({
    where: { id: venueId }
  });
};