# JWT Authentication using Node

This project demonstrates a simple authentication system built using Express.js, SQLite, bcrypt for password hashing, and JSON Web Tokens (JWT) for user authentication. 

## Prerequisites

- Node.js

## Installation

`npm install`

## Usage

`npm start`

The server will start on port 4000.

### Access the following routes:

**POST /api/auth/signup:** Create a new user account by providing a username and password in the request body. The password is securely hashed using bcrypt, and a JWT is returned upon successful registration.

**POST /api/auth/login:** Authenticate an existing user by providing their username and password in the request body. If the credentials are valid, a JWT is returned.

**GET /api/protected:** Access a protected route by including a valid JWT obtained from the login or signup process in the x-access-token header. The route is protected using the verifyToken middleware.

**Code Structure**

**routes.ts:** Defines the signup and login routes using Express.js. User passwords are hashed using bcrypt, and JWTs are generated for successful authentication.

**db.ts:** Sets up an SQLite in-memory database and creates a users table to store user data.

**middleware.ts:** Contains the verifyToken middleware to authenticate JWTs and grant access to protected routes.

**server.ts:** Configures the Express server, uses the defined routes, and includes the verifyToken middleware to protect routes.