import express from "express";

// REST Object
const app = express();

//REST API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Task Manager App",
  });
});

//PORT
const PORT = 8080;

//Run Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
