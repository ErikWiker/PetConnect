const bcrypt = require('bcryptjs'); // For password hashing
const db = require('../db');

// Create users table with updated schema
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      failed_login_attempts INT DEFAULT 0,
      account_locked_until TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

// Function to create a new user with hashed password
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
  const query = `
    INSERT INTO users (username, email, password_hash) 
    VALUES ($1, $2, $3) RETURNING id, username, email;
  `;
  const values = [username, email, hashedPassword];

  try {
    const result = await db.query(query, values);
    console.log('User created:', result.rows[0]); // Debug Statement
    return result.rows[0]; // Return created user
  } catch (error) {
    console.error('Error creating user:', error.message); 
    throw new Error('Database error during user creation');
  }
};

// Function to find user by username (or email, depending on login) 
//TODO: add username functionality?
const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1`;
  const result = await db.query(query, [username]);
  return result.rows[0];
};

// Function to validate password by comparing hashes
const validatePassword = async (password, storedHash) => {
  return bcrypt.compare(password, storedHash); // Returns true or false
};

// Call to create table (only needs to be done once, ideally)
// createUserTable().then(() => console.log("User table ready!")).catch(console.error);

module.exports = {
  createUser,
  findUserByUsername,
  validatePassword,
};
