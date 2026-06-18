import express from "express";

const app = express();
const port = 3000;

// GET / (http://localhost:3000)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /message (http://localhost:3000/message)
app.get("/message", (req, res) => {
  res.send({ message: "This is the daily message!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
