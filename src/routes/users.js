import { Router } from "express";

const router = Router();

const users = [
  {
    id: crypto.randomUUID(),
    name: "John Doe",
    email: "john.doe@email.com",
  },
  {
    id: crypto.randomUUID(),
    name: "Alice Smith",
    email: "alice.smith@email.com",
  },
];

// GET /users (all users)
router.get("/", (req, res) => {
  res.send(users);
});

// GET /users/:id (user by id)
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send({ message: `User with ID: ${id} not found` });
  }

  res.send(user);
});

// POST /users (create new user)
router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send({ message: "Name and email are required" });
  }
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

// PATCH /users/:id (update user by id)
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ message: `User with ID: ${id} not found` });
  }

  const { name, email } = req.body;

  if (name) {
    users[userIndex].name = name;
  }

  if (email) {
    users[userIndex].email = email;
  }

  res.send(users[userIndex]);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send({ message: `User with ID: ${id} not found` });
  }

  const [deletedUser] = users.splice(userIndex, 1);

  res.send(deletedUser);
});

export default router;
