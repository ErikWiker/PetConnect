// Handle pet related actions

const express = require("express");
const db = require("../db/db");
const router = express.Router();
//const { updatePet } = require('../controllers/petController'); //TODO: add getPets, addPet once refactored

// Middleware to verify JWT token
const authenticateToken = require("../middleware/authenticateToken");
router.use(authenticateToken);

//TODO: add these once refactored
// router.get('/user/pets', getPets); 
// router.post('/user/pets', addPet);
//Update Users Pet
//router.put('/user/pets/:id', updatePet);

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

// Update a pet
router.put('/pets/:id', async (req, res) => {
  const { id } = req.params;
  const { petName, type, species, age } = req.body;

  if (!['dog', 'cat', 'reptile', 'amphibian', 'fish', 'small mammal', 'bird', 'insect', 'other'].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  try {
    const query = `
      UPDATE pets
      SET pet_name = $1, type = $2, species = $3, age = $4
      WHERE id = $5 AND user_id = $6
      RETURNING id, pet_name, type, species, age;
    `;
    const userId = req.user.id;
    const result = await db.query(query, [petName, type, species, age, id, userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pet not found or unauthorized" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating pet:', err);
    res.status(500).json({ error: "Error updating pet" });
  }
});

// Delete a pet
router.delete('/pets/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const query = 'DELETE FROM pets WHERE id = $1 AND user_id = $2 RETURNING id';
    const result = await db.query(query, [id, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Pet not found or unauthorized" });
    }

    res.status(204).send(); // No content response
  } catch (err) {
    console.error('Error deleting pet:', err);
    res.status(500).json({ error: "Error deleting pet" });
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

