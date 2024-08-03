const express = require("express");
const billsRouter = express.Router();

const pg = require("pg");
const { Pool } = pg;

//TODO: abstract credentials
const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "simplebudget",
});

billsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res) => {
    const result = await pool.query("SELECT * FROM bills");
    console.log(result.rows);
    res.json(result.rows);
  })
  .post(async (req, res) => {
    res.end(`Will add the bill: ${req.body.name}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /bills");
  })
  .delete((req, res) => {
    res.end("Deleting all bills");
  });

module.exports = billsRouter;
