# Learning App Backend

## Project Description

The Learning App Backend is a NestJS application that serves as the API for the Learning App, providing endpoints for user authentication, subject management, topic management, and progress tracking. It uses Prisma as an ORM for database interactions and supports role-based access control to distinguish between learners and admin users.

### Key Features

- **User Authentication and Authorization**: Secure login and registration with JWT authentication and role-based access control (LEARNER and ADMIN roles).
- **Subject Management**: Admin users can create, update, and delete subjects.
- **Topic Management**: Admin users can create, update, and delete topics under specific subjects.
- **Progress Tracking**: Learner users can mark topics as completed.
- **Database Integration**: Uses Prisma ORM for database interactions with PostgreSQL.

## Tech Stack

- **Backend Framework**: NestJS
- **Programming Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn** (for package management)
- **PostgreSQL** (for the database)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd learning-app-backend

   docker compos up

   yarn install

   yarn run start:dev
   ```
