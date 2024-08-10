import { Router } from "express"
const billsRouter = Router()

import pg from "pg"
const { Pool } = pg

//TODO: abstract credentials
const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "simplebudget",
})

const recurrence_types = ["d", "w", "m", "y", "o"]

billsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    next()
  })
  .get(async (req, res) => {
    const result = await pool.query("SELECT bill_id FROM bills")
    console.log(result.rows)
    res.json(result.rows)
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
      } = req.body

      // Bill name
      if (!bill_name) {
        res.status(400).json({ error: "bill name is required" })
        return
      }

      // Recurrance is a single letter representing the type of recurrence
      // d - daily, w - weekly, m - monthly, y - yearly, o - one time
      if (!recurrence) {
        res.status(400).json({ error: "recurrence is required" })
        return
      } else if (!recurrence_types.includes(recurrence.toLowerCase())) {
        res.status(400).json({ error: "invalid recurrence type" })
        return
      }

      // Recurrence amount is the number of days, weeks, months, or years between each bill
      if (!recurrence_amount) {
        res.status(400).json({ error: "recurrence amount is required" })
        return
      } else if (recurrence_amount < 1) {
        res.status(400).json({ error: "recurrence amount must be at least 1" })
        return
      } else if (!Number.isInteger(recurrence_amount)) {
        res.status(400).json({ error: "recurrence amount must be an integer" })
        return
      } else if (recurrence === "d" && recurrence_amount > 365) {
        res
          .status(400)
          .json({ error: "recurrence amount must be less than 365 for days" })
        return
      } else if (recurrence === "w" && recurrence_amount > 52) {
        res
          .status(400)
          .json({ error: "recurrence amount must be less than 52 for weeks" })
        return
      } else if (recurrence === "m" && recurrence_amount > 12) {
        res
          .status(400)
          .json({ error: "recurrence amount must be less than 12 for months" })
        return
      } else if (recurrence === "y" && recurrence_amount > 100) {
        res
          .status(400)
          .json({ error: "recurrence amount must be less than 100 for years" })
        return
      }

      // Amount is the amount of the bill
      if (!amount) {
        res.status(400).json({ error: "amount is required" })
        return
      } else if (amount < 0) {
        res.status(400).json({ error: "amount must be greater than 0" })
        return
      } else if (amount > 1_000_000_000) {
        res
          .status(400)
          .json({ error: "amount must be less than 1,000,000,000" })
        return
      }

      // Start date is the date the bill starts
      if (!start_date) {
        res.status(400).json({ error: "start date is required" })
        return
      } else if (isNaN(Date.parse(start_date))) {
        res.status(400).json({ error: "invalid start date" })
        return
      }

      // End date is the date the bill ends
      if (end_date && isNaN(Date.parse(end_date))) {
        res.status(400).json({ error: "invalid end date" })
        return
      } else if (end_date && Date.parse(end_date) < Date.parse(start_date)) {
        res
          .status(400)
          .json({ error: "end date must be on or after start date" })
        return
      }

      const result = await pool.query(
        `INSERT INTO bills (
            bill_name,
            recurrence,
            recurrence_amount,
            amount,
            start_date,
            end_date
         ) VALUES (
            $1, $2, $3, $4, $5, $6
         )
         RETURNING *`,
        [
          bill_name,
          recurrence,
          recurrence_amount,
          amount,
          start_date,
          end_date,
        ],
      )
      res.json(result.rows[0])
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  .put((req, res) => {
    res.statusCode = 403
    res.end("PUT operation not supported on /bills")
  })
  .delete(async (req, res) => {
    const result = await pool.query("DELETE FROM bills")
    res.end("All bills deleted: " + result.rowCount)
  })

// Route with parameter :billId
billsRouter
  .route("/:billId")
  .get(async (req, res) => {
    try {
      const { billId } = req.params
      const result = await pool.query(
        "SELECT * FROM bills WHERE bill_id = $1",
        [billId],
      )
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Bill not found" })
      } else {
        res.json(result.rows[0])
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  .put(async (req, res) => {
    try {
      const { billId } = req.params

      // Get existing bill
      const existingBill = await pool.query(
        "SELECT * FROM bills WHERE bill_id = $1",
        [billId],
      )

      if (existingBill.rows.length === 0) {
        res.status(404).json({ error: "Bill not found" })
        return
      }

      const existingBillData = existingBill.rows[0]

      // Update bill
      const {
        bill_name = existingBillData.bill_name,
        recurrence = existingBillData.recurrence,
        recurrence_amount = existingBillData.recurrence_amount,
        amount = existingBillData.amount,
        start_date = existingBillData.start_date,
        end_date = existingBillData.end_date,
        status = existingBillData.status,
      } = req.body

      const result = await pool.query(
        `UPDATE bills SET
          bill_name = $1,
          recurrence = $2,
          recurrence_amount = $3,
          amount = $4,
          start_date = $5,
          end_date = $6,
          status = $7
        WHERE bill_id = $8 RETURNING *`,
        [
          bill_name,
          recurrence,
          recurrence_amount,
          amount,
          start_date,
          end_date,
          status,
          billId,
        ],
      )
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Bill not found" })
      } else {
        res.json(result.rows[0])
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { billId } = req.params
      const result = await pool.query("DELETE FROM bills WHERE bill_id = $1", [
        billId,
      ])
      if (result.rowCount === 0) {
        res.status(404).json({ error: "Bill not found" })
      } else {
        res.end("Bill deleted: " + result.rowCount)
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

export default billsRouter
