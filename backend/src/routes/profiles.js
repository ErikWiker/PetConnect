// Handle user profile-related actions

const express = require("express");
const db = require("../db/db");
const router = express.Router();

// Middleware
const authenticateToken = require("../middleware/authenticateToken");
router.use(authenticateToken);

// View Profile (GET)
router.get("/user/profile", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  // Check if userId exists (this is generally already guaranteed by the JWT)
  if (!userId) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  try {
    const query = "SELECT id, username, email, location FROM users WHERE id = $1";
    const result = await db.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user profile:", err);  // Log error for debugging
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Update Profile (PUT)
router.put("/user/profile", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { username, email, location } = req.body;

  // Simple validation for the inputs
  if (!username || !email || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const query = `
      UPDATE users
      SET username = $1, email = $2, location = $3
      WHERE id = $4
      RETURNING id, username, email, location;
    `;
    const values = [username, email, location, userId];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: "Error updating profile" });
  }
});



// Get all users
router.get("/users", authenticateToken, async (req, res) => {
  try {
    const query = "SELECT id, username, location FROM users WHERE id != $1";
    const result = await db.query(query, [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Get user profile by ID
router.get("/user/profile/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT id, username, email, location FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: "Error fetching user profile" });
  }
});


module.exports = router;




/* OLD CODE BEFORE SEPARATING authenticateJWT into its own file
const express = require("express");
const db = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user info to request
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming token is in the format 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user; // Attach the user ID from the token to the request
    next();
  });
};

// View Profile (GET)
router.get("/user/profile", authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  // Check if userId exists (this is generally already guaranteed by the JWT)
  if (!userId) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  try {
    const query = "SELECT id, username, email, location FROM users WHERE id = $1";
    const result = await db.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user profile:", err);  // Log error for debugging
    res.status(500).json({ error: "Error fetching profile" });
  }
});


// Update Profile (PUT)
router.put("/user/profile", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const { username, email, location } = req.body;

  // Simple validation for the inputs
  if (!username || !email || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const query = `
      UPDATE users
      SET username = $1, email = $2, location = $3
      WHERE id = $4
      RETURNING id, username, email, location;
    `;
    const values = [username, email, location, userId];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: "Error updating profile" });
  }
});


module.exports = router; 
*/