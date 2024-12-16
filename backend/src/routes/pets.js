const express = require("express");
const db = require("../db/db");
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = require("../middleware/authenticateToken");

// Get user pets
router.get("/pets", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const query = "SELECT * FROM pets WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).json({ error: "Error fetching pets" });
  }
});

// Add a pet
router.post("/pets", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { petName, type, species, age } = req.body;

  if (!['dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other'].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  try {
    const query = `
      INSERT INTO pets (user_id, pet_name, type, species, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, pet_name, type, species, age;
    `;
    const result = await db.query(query, [userId, petName, type, species, age]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding pet:', err);
    res.status(500).json({ error: "Error adding pet" });
  }
});


// Get pets by user ID
router.get("/pets/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const query = "SELECT id, pet_name AS petName, type, species, age FROM pets WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No pets found for this user" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user pets:', err);
    res.status(500).json({ error: "Error fetching user pets" });
  }
});

module.exports = router;


module.exports = router;
