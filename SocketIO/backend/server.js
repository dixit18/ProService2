const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "../config.env" });

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected.".green.bgYellow));

const app = require("./app");
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}!`.green.bold)
);
