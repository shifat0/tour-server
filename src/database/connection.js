const mongoose = require("mongoose");
const config = require("../../config/config");

const db = require("./models");

mongoose
  .connect(config.NOSQL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to Database.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = { mongoose, db };
