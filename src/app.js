import express from "express";

const app = express();

// GET /users (all users)
app.get("/users", (req, res) => {
  res.send("All users");
});

// GET /users/:id (user by id)
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User #${id}`);
});

// POST /users (create new user)
app.post("/users", (req, res) => {
  res.send("User created!");
});

// PATCH /users/:id (update user by id)
app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User #${id} updated!`);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User #${id} deleted!`);
});

export default app;
