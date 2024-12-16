const pool = require('./db/db'); // Ensure 'db.js' is in the same directory as 'test-db.js'

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err); // This will display errors
  } else {
    console.log('Database connected:', res.rows[0]); // This will display the timestamp
  }
  pool.end(); // Cleanly close the connection
});
