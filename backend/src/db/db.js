// Sets up a connection pool to PostgreSQL database using environment variables I defined
// Sets up database configuration
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;
console.log("Connected to database:", process.env.DB_NAME);
