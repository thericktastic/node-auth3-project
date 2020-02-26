const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function find() {
  return db("users").select("id", "username", "password", "department");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password", "department")
    .where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username", "password", "department")
    .where({ id })
    .first();
}
