// users.js
const express = require("express");
const bcrypt = require("bcrypt");
const {
  VERSION,
  SALT_ROUND,
  CONNECTION_STRING,
} = require("../utils/constants");
const pgp = require("pg-promise")();

const db = pgp(CONNECTION_STRING);

// Express router
const router = express.Router();

router.post(`/${VERSION}/users/add-user`, async (req, res) => {
  const user = { ...req.body };

  const hash = await bcrypt.hash(user.password, SALT_ROUND);

  const userId = await db.one(
    "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING userid;",
    [user.email, hash, user.firstname, user.lastname]
  );

  res.send(userId);
});

// Export the router
module.exports = router;
