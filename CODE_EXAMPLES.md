# Code Examples

This file gives simple examples of the code we wrote in class and the kind of requests we can send to our Express API.

The goal is to help you connect the code with the server behavior.

## 1. Starting The Server

This is the code that starts our server:

```js
import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
```

What this does:

- imports the Express app
- chooses port `3000`
- starts listening for requests

## 2. Creating The Express App

In `src/app.js`, we create and configure the app:

```js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: "*" }));
```

What this does:

- `express()` creates the app
- `express.json()` lets us read JSON from the request body
- `helmet()` adds security headers
- `compression()` makes responses smaller
- `cors()` allows requests from other origins

## 3. A Simple Route

This route returns all users:

```js
router.get("/", (req, res) => {
  res.send(users);
});
```

What this means:

- `router.get(...)` creates a GET route
- `"/"` means the base route inside `/users`
- `res.send(users)` sends the array back to the client

Because this router is connected to `/users`, this becomes:

```text
GET /users
```

## 4. Getting One User By ID

This route finds one user:

```js
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send({ message: `User with ID: ${id} not found` });
  }

  res.send(user);
});
```

Important ideas here:

- `:id` is a route parameter
- `req.params.id` reads the ID from the URL
- `.find(...)` searches the array
- if no user is found, the server returns `404`

Example request:

```http
GET http://localhost:3000/users/123
```

Example response if not found:

```json
{
  "message": "User with ID: 123 not found"
}
```

## 5. Creating A New User

This route creates a new user:

```js
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
```

Important ideas here:

- `req.body` contains the JSON data sent by the client
- we validate that `name` and `email` exist
- `crypto.randomUUID()` creates a unique ID
- `users.push(...)` adds the new user to the array
- status `201` means "created"

Example request:

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Bob Smith",
  "email": "bob.smith@email.com"
}
```

Example response:

```json
{
  "id": "generated-id",
  "name": "Bob Smith",
  "email": "bob.smith@email.com"
}
```

## 6. Updating A User

This route updates an existing user:

```js
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
```

Important ideas here:

- `.findIndex(...)` finds the position of the user in the array
- `PATCH` means partial update
- we only change the fields that were sent

Example request:

```http
PATCH http://localhost:3000/users/123
Content-Type: application/json

{
  "name": "Jonathan Doe"
}
```

## 7. Deleting A User

This route deletes a user:

```js
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send({ message: `User with ID: ${id} not found` });
  }

  const [deletedUser] = users.splice(userIndex, 1);

  res.send(deletedUser);
});
```

Important ideas here:

- `.splice(...)` removes the user from the array
- the deleted user is returned in the response

Example request:

```http
DELETE http://localhost:3000/users/123
```

## 8. Not Found Middleware

This middleware handles routes that do not exist:

```js
export function notFound(req, res, next) {
  res.status(404).send({
    message: `Not Found - ${req.method} ${req.url}`,
  });
}
```

Example:

```http
GET http://localhost:3000/unknown-route
```

Example response:

```json
{
  "message": "Not Found - GET /unknown-route"
}
```

## 9. Error Middleware

This middleware handles server errors:

```js
export function onError(error, req, res, next) {
  const status = res.statusCode < 500 ? 500 : res.statusCode;
  const message = error.message || "Internal Server Error";

  res.status(status).send({ message });
}
```

This gives us one place to send error messages in a clean way.

## 10. Testing With `test.http`

We also created a `test.http` file with ready-to-use examples:

```http
GET http://localhost:3000/users
```

```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Bob Smith",
  "email": "bob.smith@email.com"
}
```

```http
PATCH http://localhost:3000/users/123
Content-Type: application/json

{
  "name": "Jonathan Doe"
}
```

```http
DELETE http://localhost:3000/users/123
```

## Summary

These examples show how our Express code connects to real HTTP requests.

When reading the code, always ask:

- what route is this?
- what data comes in?
- what response goes out?
- what happens if something goes wrong?

That way, you can understand both the JavaScript code and the API behavior at the same time.
