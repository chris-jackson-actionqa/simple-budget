import express, { json } from "express"
import morgan from "morgan"
import billsRouter from "./routes/billsRouter.js"

const PORT = 3100
const app = express()
// app.use(bodyParser.json());
app.use(morgan("dev"))
app.use(json())

// Bills router
app.use("/bills", billsRouter)

app.get("/", (req, res) => {
  res.send("Welcome to Simple Budget!")
})

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})
