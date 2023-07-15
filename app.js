const dotenv = require("dotenv");
const express = require("express"); // Import express
const cors = require("cors"); // Import cors
dotenv.config({ path: "./.env" });
const api = require("./src/routes/api"); // Import api routes

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
require("./src/database/connection"); // Connect to database
app.use("/api/", api); // Use api routes

module.exports = app;
