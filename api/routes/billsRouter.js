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

const recurrance_types = ["d", "w", "m", "y"];

billsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res) => {
    const result = await pool.query("SELECT bill_id FROM bills");
    console.log(result.rows);
    res.json(result.rows);
  })
  .post(async (req, res) => {
    try {
      const {
        bill_name,
        recurrence,
        recurrence_amount,
        amount,
        start_date,
        end_date,
      } = req.body;

      // Bill name
      if (!bill_name) {
        res.status(400).json({ error: "bill name is required" });
        return;
      }

      // Recurrance is a single letter representing the type of recurrence
      // d - daily, w - weekly, m - monthly, y - yearly
      if (!recurrence) {
        res.status(400).json({ error: "recurrence is required" });
        return;
      } else if (recurrence_types.indexOf(recurrence.toLowerCase()) === -1) {
        res.status(400).json({ error: "invalid recurrence type" });
        return;
      }

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

// Route with parameter :billId
billsRouter
  .route("/:billId")
  .get(async (req, res) => {
    try {
      const { billId } = req.params;
      const result = await pool.query("SELECT * FROM bills WHERE id = $1", [
        billId,
      ]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Bill not found" });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { billId } = req.params;
      const { bill_name } = req.body;
      const result = await pool.query(
        "UPDATE bills SET bill_name = $1 WHERE id = $2 RETURNING *",
        [bill_name, billId]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Bill not found" });
      } else {
        res.json(result.rows[0]);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { billId } = req.params;
      const result = await pool.query("DELETE FROM bills WHERE id = $1", [
        billId,
      ]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: "Bill not found" });
      } else {
        res.end("Bill deleted: " + result.rowCount);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = billsRouter;
