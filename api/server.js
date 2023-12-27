const { PORT } = require("./utils/constants");
const { app } = require("./app");

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
