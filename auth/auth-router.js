const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import users-model so api-router can access database
const Users = require("../users/users-model.js");

// import jwtSecret
const { jwtSecret } = require("../config/secrets.js");

// registration endpoint
router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      console.log("This is error in router.post(register): ", error);
      res.status(500).json({ error: "Error registering user" });
    });
});

// login endpoint
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log("This is req.body in router.post(login): ", req.body)

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ error: "Invalid crednetials" });
      }
    })
    .catch(error => {
      console.log("This is error in router.post(/login): ", error);
      res.status(500).json({ error: "Error loggin in" });
    });
});

function generateToken(user) {
  const payload = {
    userId: user.id
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
