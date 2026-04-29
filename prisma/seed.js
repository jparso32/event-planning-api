import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.invitation.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const regularUser = await prisma.user.create({
    data: {
      username: "jaydenp",
      email: "jayden@example.com",
      password: hashedPassword,
      role: "user"
    }
  });

  const adminUser = await prisma.user.create({
    data: {
      username: "adminuser",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    }
  });

  const venue = await prisma.venue.create({
    data: {
      userId: regularUser.id,
      name: "Student Union Ballroom",
      address: "8845 Craver Rd",
      city: "Charlotte",
      state: "NC",
      capacity: 200
    }
  });

  const adminVenue = await prisma.venue.create({
    data: {
      userId: adminUser.id,
      name: "Conference Room A",
      address: "9201 University City Blvd",
      city: "Charlotte",
      state: "NC",
      capacity: 50
    }
  });

  const event = await prisma.event.create({
    data: {
      userId: regularUser.id,
      venueId: venue.id,
      title: "AWS Networking Mixer",
      description: "A networking event for students and industry guests.",
      eventDate: new Date("2026-04-15T00:00:00.000Z"),
      startTime: "17:00",
      endTime: "19:00"
    }
  });

  const adminEvent = await prisma.event.create({
    data: {
      userId: adminUser.id,
      venueId: adminVenue.id,
      title: "Admin Planning Meeting",
      description: "A sample event owned by the admin user.",
      eventDate: new Date("2026-04-20T00:00:00.000Z"),
      startTime: "12:00",
      endTime: "13:00"
    }
  });

  await prisma.invitation.create({
    data: {
      userId: regularUser.id,
      eventId: event.id,
      guestName: "Alex Johnson",
      guestEmail: "alex@example.com",
      rsvpStatus: "pending"
    }
  });

  await prisma.invitation.create({
    data: {
      userId: adminUser.id,
      eventId: adminEvent.id,
      guestName: "Jordan Smith",
      guestEmail: "jordan@example.com",
      rsvpStatus: "accepted"
    }
  });

  console.log("Seed complete.");
  console.log("Regular User: jayden@example.com / Password123!");
  console.log("Admin User: admin@example.com / Password123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });