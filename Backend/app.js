require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./Routes/Auth");
const DATABASE_CONNECTION = require("./Database/db");
// Creating Port
const PORT = process.env.PORT || 8484;

// Applying Middlewares
app.use(express.json());
app.use("/api", router);

// Using Databse Middleware
DATABASE_CONNECTION(process.env.DATABASE);

// Listening Server
app.listen(PORT, () =>
  console.log(`Your server is runing on port http://localhost:${PORT}`)
);
