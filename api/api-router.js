const router = require("express").Router();

// import routers
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

// import middleware
const restricted = require("../auth/restricted-middleware.js");

// call routers and implement any applicable middleware
router.use("/auth", authRouter);
router.use("/users", restricted, usersRouter);

function checkrole(department) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.department &&
      req.decodedToken.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ you: "shalle not pass!" });
    }
  };
}

module.exports = router;
