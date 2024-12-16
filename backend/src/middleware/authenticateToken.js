const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  //const token = req.header("Authorization")?.replace("Bearer ", ""); TODO Remove?
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming token is in the format 'Bearer <token>'

  // If there is no token, return an error response
  if (!token) {
    return res.status(401).json({ error: "Access Denied. No Token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or Expired Token" });
    }

    // Attach the user to the request object for access in the next middleware/route
    req.user = user;

    // Call next to continue the request processing
    next();
  });
};

module.exports = authenticateToken;
