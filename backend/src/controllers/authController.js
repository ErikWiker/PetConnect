//Logic for authentication and signup

const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/authUtils");
const db = require("../db/db");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!email || !password || !username ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({error: "Password should be at least 6 characters long"});
  }

  try {
    // Check if the email already exists
    const checkQuery = "SELECT * FROM users WHERE email = $1";
    const checkResult = await db.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password using utility
    const hashedPassword = await hashPassword(password);

    const query = `
      INSERT INTO users (username, email, password_hash )
      VALUES ($1, $2, $3) RETURNING id, username, email;
    `;
    const values = [username, email, hashedPassword];
    const result = await db.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: "Error creating user. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in the environment variables.");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
      expiresIn: "1h",
      algorithm: "HS256" // Explicit algorithm chosen
    });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: "Error logging in. Please try agin later." });
  }
};

module.exports = { registerUser, loginUser };
