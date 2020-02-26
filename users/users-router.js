const router = require("express").Router();

// import users model
const Users = require("./users-model.js");

// set up basic GET endpoint to retrieve all users
router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      console.log("This is users in router.get(all users): ", users);
      res.json(users);
    })
    .catch(error => {
      console.log("This is error in router.get(all users): ", error);
      res.status(500).json({ error: "Error retrieving users" });
    });
});

module.exports = router;