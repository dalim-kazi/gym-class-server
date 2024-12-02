# Gym Class Scheduling and Membership Management System

## Description

The Gym Class Scheduling and Membership Management System is designed to efficiently manage gym operations. The system supports three roles: **Admin**, **Trainer**, and **Trainee**, each with specific permissions. Admins handle the creation and management of trainers, class scheduling, and trainer assignment. Trainers are responsible for conducting classes and can only view their schedules. Trainees can book classes and manage their profiles.

The system integrates JWT-based authentication, role-based access control, and enforces various business rules to maintain efficient class management, such as limits on class schedules, trainee bookings, and more.

## Features

### Frontend (Client-Side)
- **Home Page:** A welcoming page with details about gym services.
- **Authentication Pages:**
  - **Login Page:** Email and password login using JWT authentication.
  - **Registration Page (Trainees only):** Sign up page with email, password, and full name fields for trainee registration.
- **Admin Dashboard:**
  - **Manage Trainers:** Admins can create, read, update, and delete trainers.
  - **Class Scheduling:** Admins can create new schedules, ensure validation (max 5 schedules per day, 2-hour classes), and assign trainers to classes.
- **Trainer Dashboard:** 
  - **View Classes:** Trainers can view their assigned classes (date, time, trainees).
- **Trainee Dashboard:** 
  - **Book Classes:** Trainees can book available classes, ensuring no more than 10 trainees per class.

### Backend (Server-Side)
- **JWT Authentication:** Secure user authentication for all roles.
- **Admin and Trainer Management:** Admins can manage trainer information.
- **Class Scheduling Management:** Admins can schedule classes, with restrictions on the number of classes per day and trainees per class.
- **Error Handling:** Comprehensive error handling for unauthorized access, validation errors, booking limits, and more.

### API Integration
- **Redux Toolkit** is used for data fetching, managing authentication, class schedules, and trainer data. It ensures a smooth user experience with responsive error handling.
- **Mobile Responsiveness:** The system is designed to be fully responsive, with pages optimized for mobile use using **Tailwind CSS**.

## Technology Stack

### Frontend
- **Programming Language:** JavaScript/TypeScript (recommended)
- **Framework:** Next.js
- **Styling:** Tailwind CSS (for responsive design and component styling)
- **State Management:** Redux Toolkit (for managing state and handling data fetching)
- **Authentication:** JWT (client-side validation)

### Backend
- **Programming Language:** JavaScript/TypeScript (recommended)
- **Framework:** Express.js
- **Database:** MongoDB/PostgreSQL (depending on preference)
- **ORM/ODM:** Prisma/Mongoose (for MongoDB/PostgreSQL interaction)
- **Authentication:** JWT (for server-side validation)

## Setup

### Prerequisites
1. **Node.js** (version 14.x or higher)
2. **npm** or **yarn**
3. **MongoDB/PostgreSQL** (Ensure the database is set up and running)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
