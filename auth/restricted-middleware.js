const jwt = require("jsonwebtoken"); // import this first

const { jwtSecret } = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    // for jwt.verify(name of token we want to verify, secret, callbackfunction(error,  decodedToken))
    jwt.verify(authorization, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
