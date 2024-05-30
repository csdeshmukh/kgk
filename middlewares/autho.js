const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "Access denied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      req.user = decoded;

      // Check if user has one of the required roles
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ msg: "Access forbidden: insufficient permissions" });
      }

      next();
    } catch (err) {
      res.status(400).json({ status: 400, msg: "Invalid token" });
    }
  };
};
