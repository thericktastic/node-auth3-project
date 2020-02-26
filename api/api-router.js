const router = require("express").Router();

// import routers
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

// import middleware
const restricted = require("../auth/restricted-middleware.js");

// call routers and implement any applicable middleware
router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;