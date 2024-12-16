// Handles Authentication routes (login/register)
const express = require("express");  // Importing Express to handle HTTP requests
const { registerUser, loginUser } = require("../controllers/authController");  // Importing the controller functions for register and login

const router = express.Router();  // Creating an Express router instance

// Register route
router.post("/signup", registerUser);  // When a POST request is made to "/auth/signup", it triggers the registerUser function from the controller

// Login route
router.post("/login", loginUser);  // When a POST request is made to "/auth/login", it triggers the loginUser function from the controller

module.exports = router;  // Export the router so it can be used in server.js

