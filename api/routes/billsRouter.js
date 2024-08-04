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
    try {
      const { bill_name } = req.body;
      const result = await pool.query(
        "INSERT INTO bills (bill_name) VALUES ($1) RETURNING *",
        [bill_name]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /bills");
  })
  .delete(async (req, res) => {
    const result = await pool.query("DELETE FROM bills");
    res.end("All bills deleted: " + result.rowCount);
  });

module.exports = billsRouter;
