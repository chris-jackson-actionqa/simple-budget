// users.js
const express = require("express");
const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../../utils/constants");
const pgp = require("pg-promise")();
const { getDb } = require("../../utils/db");

const db = getDb();

// Express router
const router = express.Router();

//------------------------
//  ALL USERS
//------------------------

// GET /users
// retrieves all users
router.get("/", async (req, res) => {
  const allUsers = await db.any("SELECT * FROM users;");
  res.send(allUsers);
});

//------------------------
//  Single User
//------------------------

// POST /users
// Create new user
// Returns new userid
router.post(`/`, async (req, res) => {
  const user = { ...req.body };

  const hash = await bcrypt.hash(user.password, SALT_ROUND);

  const userId = await db.one(
    "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING userid;",
    [user.email, hash, user.firstname, user.lastname]
  );

  res.send(userId);
});

// GET /users/:userId
// Retrieve single user
router.get("/:userId", async (req, res) => {
  const user = await db.one(
    "SELECT userid, email, firstname, lastname FROM users WHERE userid = $1;",
    req.params["userId"]
  );
  res.send(user);
});

// PUT /users/:userId
// Edit info for user
router.put("/:userId", async (req, res) => {
  const user = { ...req.body };
  const queryBuilder = [];

  if (user.email) {
    queryBuilder.push(`email = '${user.email}'`);
  }

  if (user.firstname) {
    queryBuilder.push(`firstname = '${user.firstname}'`);
  }

  if (user.lastname) {
    queryBuilder.push(`lastname = '${user.lastname}'`);
  }

  // ERROR: no parameters
  if (queryBuilder.length === 0) {
    res.status(400).send("No fields provided to update user.");
    return;
  }

  const query = `UPDATE users SET ${queryBuilder.join(", ")} WHERE userid = ${
    req.params["userId"]
  } RETURNING userid, email, firstname, lastname;`;
  const response = await db.one(query);
  res.send(response);
});

// DELETE /users/:userId
// Deletes a user with given user id
router.delete("/:userId", async (req, res) => {
  await db.none("DELETE FROM users WHERE userid = $1", [req.params["userId"]]);
  res.send(`Deleted user ${req.params.userId}`);
});

// Export the router
module.exports = router;
