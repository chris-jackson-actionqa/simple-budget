const express = require("express");
const bodyParser = require("body-parser");
const { PORT, VERSION } = require("./utils/constants");
const userRoutes = require("./routes/v0/users");
const { getDb } = require("./utils/db");

const app = express();
const db = getDb();

app.use(bodyParser.json());
app.use(`/${VERSION}/users`, userRoutes);

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

module.exports = { app };
