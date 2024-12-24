# AM Tech Networks- Assignment

## Auth Application with JWT Authentication, Google reCAPTCHA, and Token Expiry Notifications

### Overview

This project implements a secure authentication system using Node.js, Express.js, and PostgreSQL. It includes user registration, login, profile management, and JWT-based session handling. Additionally, users are notified when their session is about to expire, with optional token refresh functionality. Google reCAPTCHA is integrated to prevent bots and ensure secure login and registration.

### Features

1. User Authentication:
    - User registration with hashed passwords (using bcrypt)
    - User login with email/username and password
    - Secure JWT issuance on successful login/registration
2. Google reCAPTCHA Integration:
    - Verifies reCAPTCHA tokens to ensure requests are from legitimate users
3. Token Expiry Management:
    - Notify users when their token is about to expire
4. Express Middleware:
    - Rate limiting to protect against brute force attacks
    - Request validation with Joi
    - Secure cookie storage for JWT tokens
5. Database Management:
    - PostgreSQL integration with connection pooling

### Prerequisites

1. Environment Requirements:
    - Node.js
    - npm
    - PostgreSQL
2. Google reCAPTCHA:
    - Site key and secret key from Google reCAPTCHA
3. Environment Variables:
    Create a `.env` file in the root directory with the following variables:

    ```txt
    SERVER_PORT=8081

    # Postgres database configuration
    PG_HOST=<YOUR_PG_HOST>
    PG_PORT=<YOUR_PG_PORT
    PG_DATABASE=<YOUR_PG_DATABASE>
    PG_USER=<YOUR_PG_USER>
    PG_PASSWORD=<YOUR_PG_PASSWORD>

    # Connection string for PostgreSQL (Optional)
    PG_CONNECTION_STRING=postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}

    # JWT secret key
    JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
    JWT_EXPIRY=<YOUR_JWT_EXPIRY>

    # Google recaptcha secret key
    RECAPTCHA_SECRET_KEY=<YOUR_RECAPTCHA_SECRET_KEY>
    ```

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Gauravkumar1502/AM-Tech.git
    cd AM-Tech
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the database:
    - Create a new PostgreSQL database
    - Create the `users` table using the following SQL query:

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### Running the Application

1. Start the server:

    ```bash
    npm start
    ```

2. The server will start on `http://localhost:${SERVER_PORT}`

### Endpoints

1. Views
    - `/login` - Login page
    - `/register` - Register page
    - `/profile` - User profile page
2. API
    - `/api/auth/register` - User registration
    - `/api/auth/login` - User login
    - `/api/auth/logout` - User logout
    - `/api/auth/profile` - Get user profile

### Project Structure

```txt
├── src/                # Application source code
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── public/         # Static files (CSS, JS, images)
│   ├── routes/         # Express route handlers
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── validators/     # Request data validation
│   └── views/          # HTML views
│   └── server.js       # Express application
├── .gitignore          # Files and directories to be ignored by Git
├── .env                # Environment variables
├── package.json        # NPM dependencies and scripts
└── README.md           # Project overview
```
