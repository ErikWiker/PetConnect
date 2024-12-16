require('dotenv').config(); // Load environment variables

const express = require("express");
const authRoutes = require("./src/routes/auth"); // Require authRoutes from auth.js )import auth routes)
const profilesRouter = require('./src/routes/profiles'); // TODO: Ensure correct path
const petsRouter = require('./src/routes/pets');
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Security
app.use(helmet()); // TODO: Add security related headers
app.use(cors());

// Middleware (also security related)
app.use(express.json());

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per windowMs
  message: "Too many requests, please try again later."
});
app.use(limiter);

// Mount routes
app.use("/auth", authRoutes); // This defines the base path for auth routes
app.use('/profile', profilesRouter); //Mount profilesRouter to /profile
app.use('/user', petsRouter); // Mount petsRouter to /user


// Test Route
app.get("/", (req, res) => {
  res.send("Pet Connection App Backend");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Check if JWT is loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET); // TODO: DEBUG CHECK

