import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";

//Configure Env
dotenv.config();

// Configure DB
connectDB();

// REST Object
const app = express();

//REST API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Task Manager App",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//Run Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
