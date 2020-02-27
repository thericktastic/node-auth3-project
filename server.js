// import express
const express = require("express");

// import routers
const apiRouter = require("./api/api-router.js");

// import middleware
const configureMiddleware = require("./api/config-middleware.js");

// create a server named "server" by calling the express function
const server = express();

// call middleware
configureMiddleware(server);

// use routers
server.use("/api", apiRouter);

// set up initial endpoint to test if server is live
server.get("/", (req, res) => {
  res.json({ api: "leggggooo!!!" });
});

// export server for use in index.js
module.exports = server;
