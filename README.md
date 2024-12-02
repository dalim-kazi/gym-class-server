Backend README (gym-class-backend)
Gym Class Backend
Description
This is the server-side API for the Gym Class Scheduling and Membership Management System. It provides secure endpoints for user authentication, class scheduling, trainer management, and more.

Features
Authentication: JWT-based secure authentication for all roles.
Role-Based Access Control: Separate permissions for Admins, Trainers, and Trainees.
Class Scheduling Management: Enforce limits on class schedules and trainee bookings.
Error Handling: Comprehensive error responses for validation and authorization errors.
Tech Stack
Framework: Express.js
Database: MongoDB/PostgreSQL
ODM/ORM: Mongoose/Prisma
Authentication: JWT
Logger: Winston
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/dalim-kazi/gym-class-server
cd gym-class-backend
Install dependencies:

bash
Copy code
npm install
Configure environment variables: Create a .env file in the root directory and add:

env
Copy code
PORT=5000
DATABASE_URL=https://gym-class-server.onrender.com
JWT_SECRET=dsgsdfgkdkfgnvrtgewgdfgdfsgbfdbfdgvgdfvbcvnbcvncvnxnfgjfgmnhgjghkghkfuiuyjmdfbhfghfjfgjgfjnghmkkhjk
Start the server:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
npm start
Available Scripts
npm run build: Compiles TypeScript into JavaScript.
npm run dev: Starts the server in development mode using nodemon.
npm start: Runs the compiled production server.


API Endpoints
Authentication and User Management
Base Route: /auth

HTTP Method	Endpoint	Description	Roles
POST	/auth/register	Register a new user (trainee only).	Public
POST	/auth/login	Login a user and receive a JWT token.	Public
GET	/auth/get-all-user	Retrieve all users.	Admin
GET	/auth/single-user/:id	Retrieve a single user by ID.	Admin
PATCH	/auth/update-user/:id	Update user details by ID.	Admin
DELETE	/auth/delete-user/:id	Delete a user by ID.	Admin
Booking Management
Base Route: /booking

HTTP Method	Endpoint	Description	Roles
POST	/booking	Create a new booking.	Admin, Trainer, Trainee
GET	/booking	Retrieve all bookings.	Admin, Trainer, Trainee
PATCH	/booking/:id	Update the status of a booking by ID.	Admin, Trainer, Trainee
DELETE	/booking/:id	Delete a booking by ID.	Admin, Trainer, Trainee
Class Schedule Management
Base Route: /class-schedule

HTTP Method	Endpoint	Description	Roles
POST	/class-schedule	Create a new class schedule.	Admin
GET	/class-schedule	Retrieve all class schedules.	Public
GET	/class-schedule/:id	Retrieve a class schedule by ID.	Admin
PATCH	/class-schedule/:id	Update a class schedule by ID.	Admin
DELETE	/class-schedule/:id	Delete a class schedule by ID.	Admin
Authorization Rules
Public: Routes that do not require authentication.
Authenticated Users: Routes require a valid JWT token.
Role-Specific Permissions:
Admin: Full access to all resources.
Trainer: Access to bookings and their assigned schedules.
Trainee: Access to create and view bookings.




Folder Structure
bash
Copy code
.
├── src/
│   ├── controllers/   # Logic for handling API requests
│   ├── routes/        # Route definitions
│   ├── models/        # Database models (e.g., User, Class)
│   ├── middlewares/   # Authentication and validation middlewares
│   ├── utils/         # Helper functions and configurations
│   └── server.ts      # Entry point
├── dist/              # Compiled JavaScript files
Dependencies
Express.js
Mongoose
JWT
Winston
Zod (for validation)
