const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

// Utility function to hash the password before saving it in the database.
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Utility function to compare the hashed password with the one provided by the user during login.
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
