Testing Credentials
Email: jayden@example.com
Password: Password123!
Role: user

# Final Project Template

This repository provides the **folder structure** for your team’s final project. All implementation is left to students.


Event Planning API
Project Overview

This project is an Event Planning API that allows users to create accounts, log in, manage venues, create
events, and send invitations. The goal of this project was to build a backend API using Node.js, Express,
Prisma, PostgreSQL, and JWT authentication.

The API is designed so that each user can securely manage their own venues, events, and invitations.
Authentication is required for protected routes, which helps keep user data private.
Features
• 
• 
• 
• 
• 
• 
• 
• 
User signup and login
JWT authentication
Protected API routes
Venue creation and management
Event creation and management
Invitation creation and management
PostgreSQL database with Prisma ORM
Swagger API documentation
Technologies Used
• 
• 
• 
• 
• 
• 
• 
• 
Node.js
Express.js
PostgreSQL
Prisma ORM
JWT Authentication
Swagger UI
YAML Documentation
VS Code
Installation
Clone the repository:

git clone YOUR_REPOSITORY_URL
Move into the project folder:
cd final-project-template
Install dependencies:
npm install
Environment Variables
Create a 
.env file in the root directory.

Example:
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/event_planning_db"
JWT_SECRET="supersecretjwtkey"

Running The Project
Start the development server:
npm run dev

The server should run at:
http://localhost:3000
Swagger Documentation

Swagger UI is available at:
http://localhost:3000/api-docs
Swagger can be used to test routes directly in the browser.
API Routes
Auth Routes
Signup
POST /api/auth/signup
Login
POST /api/auth/login
Venue Routes
Get Venues
GET /api/venues
Create Venue
POST /api/venues
Event Routes
Get Events
GET /api/events

Create Event
POST /api/events
Invitation Routes
Get Invitations
GET /api/invitations
Create Invitation
POST /api/invitations
Authentication
Protected routes require a JWT token.
Add this to request headers:
Authorization: Bearer YOUR_TOKEN
You can get a token by logging in through:
POST /api/auth/login
Database Models
The project uses Prisma models for:
• 
• 
• 
• 
User
Venue
Event
Invitation

Relationships were created so that users own venues, venues contain events, and events can contain
invitations.
Testing Credentials
For grading and testing protected endpoints, use the following login credentials:
Email: jayden@example.com
Password: Password123!
Role: user
Login endpoint:
POST /api/auth/login
After logging in, copy the returned JWT token and use it in protected routes.
Example header:
Authorization: Bearer YOUR_TOKEN
Protected routes include:
• 
• 
• 
/api/venues
/api/events
/api/invitations
This allows protected endpoints to be tested correctly during grading.
Project Notes
This project was built to practice backend API development, authentication, database management, and
route protection. Swagger was added to make testing easier and to provide API documentation.
A lot of the project focused on connecting routes, controllers, services, and Prisma together so the backend
stayed organized.

Author
Created by Jayden Parsons
Computer Science Student University of North Carolina at Charlotte
