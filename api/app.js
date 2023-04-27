const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3100;
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
