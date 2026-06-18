import express from "express";

const app = express();

// GET / (http://localhost:3000)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /message (http://localhost:3000/message)
app.get("/message", (req, res) => {
  res.send({ message: "This is the daily message!" });
});

export default app;