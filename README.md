# MERN Stack Google Authentication System

This project is a full-stack web application that allows users to authenticate using their Google accounts. It uses the MERN (MongoDB, Express.js, React, Node.js) stack for building both the frontend and backend.

## Features

- User authentication using Google OAuth 2.0
- MongoDB as the database for storing user information
- Express.js for building the backend API
- React for the frontend user interface
- Node.js as the runtime environment for server-side code

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- Google Developer Console API credentials (OAuth client ID and client secret)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern-google-authentication.git
   cd mern-google-authentication
   
Run the Application
Start the server:

bash
Copy code
cd server
npm start
The server will run on http://localhost:3001.

Start the client:

bash
Copy code
cd client
npm start
The client will run on http://localhost:3000.

3 .Open your browser and navigate to http://localhost:3000 to use the application.



mern-google-authentication/
|-- client/                  # Frontend React app
|   |-- src/
|   |   |-- components/
|   |   |-- App.js
|   |   |-- ...
|-- server/                  # Backend Express.js app
|   |-- config/
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- .env
|   |-- server.js
|   |-- ...
|-- .gitignore
|-- package.json
|-- README.md

