const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");

const PORT = 3100;
const VERSION = "v0";
const CONNECTION_STRING = "postgres://localhost:5432/simplebudget";
const SALT_ROUND = 8;

const app = express();
const db = pgp(CONNECTION_STRING);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(`/${VERSION}/users/add-user`, async (req, res) => {
  const user = { ...req.body };

  const hash = await bcrypt.hash(user.password, SALT_ROUND);

  const userId = await db.one(
    "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING userid;",
    [user.email, hash, user.firstname, user.lastname]
  );

  res.send(userId);
});

app.post(`/${VERSION}/accounts/add-account`, async (req, res) => {
  const accountId = await db.one(
    "INSERT INTO accounts (userid) VALUES ($1) RETURNING accountid;",
    [req.body.userId]
  );
  res.send(accountId);
});

app.post(`/${VERSION}/expenses/add-expense`, (req, res) => {
  const expense = {
    accountId: req.body.account_id,
    expenseName: req.body.expense_name,
    recurrance: req.body.recurrance,
    recurranceAmount: req.body.recurrance_amount,
    startingDate: req.body.starting_date,
    amount: req.body.amount,
  };

  db.one(
    "INSERT INTO expenses (account_id, expense_name, recurrance, recurrance_amount, starting_date, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING expense_id;",
    [
      expense.accountId,
      expense.expenseName,
      expense.recurrance,
      expense.recurranceAmount,
      expense.startingDate,
      expense.amount,
    ]
  ).then((data) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
