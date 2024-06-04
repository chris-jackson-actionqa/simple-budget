const express = require("express");
const morgan = require("morgan");
const billsRouter = require("./routes/billsRouter");

const PORT = 3100;
const app = express();
// app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());

// Bills router
app.use("/bills", billsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
