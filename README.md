# Express Project

In this class, we built a simple REST API with Express.js. The goal of this project was to practice how a backend server receives requests, processes data, and sends responses back to the client.

This project is a small "users" API. It lets us:

- get all users
- get one user by ID
- create a new user
- update an existing user
- delete a user

## What We Practiced

During this class, we worked on several important backend concepts:

- creating a server with Express
- organizing code into separate files
- using middleware
- working with routes
- reading JSON data from the request body
- sending proper HTTP status codes
- building basic CRUD operations

CRUD means:

- Create
- Read
- Update
- Delete

## Project Structure

Here is the main structure of the project:

```text
src/
  app.js
  index.js
  routes/
    users.js
  middleware/
    not-found.js
    on-error.js
test.http
```

### `src/index.js`

This file starts the server.

- It imports the Express app from `app.js`
- It chooses port `3000`
- It runs `app.listen(...)` so the server can accept requests

This file is the entry point of the project.

### `src/app.js`

This file creates and configures the Express application.

Here we:

- create the app with `express()`
- enable `express.json()` so the server can read JSON from requests
- use `helmet()` for basic security headers
- use `compression()` to compress responses
- use `cors()` to allow requests from other origins
- connect the `/users` routes
- add the `notFound` middleware
- add the `onError` middleware

This file is where the app is assembled.

### `src/routes/users.js`

This file contains all the routes for the users resource.

It also contains a simple array called `users` that acts like a fake database for now.

Each user has:

- `id`
- `name`
- `email`

The IDs are created with `crypto.randomUUID()`.

### `src/middleware/not-found.js`

This middleware runs when the user requests a route that does not exist.

Example:

- `GET /abc`

The server responds with status `404` and a message that includes the request method and URL.

### `src/middleware/on-error.js`

This middleware handles unexpected errors.

If something breaks in the server, this middleware sends:

- a status code
- an error message

This is useful because it gives us one central place to handle server errors.

## How The App Works

When the project runs, the flow is:

1. `src/index.js` starts the server
2. `src/app.js` sets up middleware and routes
3. a request comes in from the client
4. Express checks the matching route
5. the route handler sends a response
6. if no route matches, `notFound` runs
7. if an error happens, `onError` runs

## Users API Endpoints

### `GET /users`

This route returns all users from the array.

Use this when we want to read the full list.

### `GET /users/:id`

This route returns one user by ID.

If the ID does not exist, the server returns:

- status `404`
- message saying the user was not found

### `POST /users`

This route creates a new user.

The request body must include:

```json
{
  "name": "Bob Smith",
  "email": "bob.smith@email.com"
}
```

If `name` or `email` is missing, the server returns:

- status `400`
- message: `"Name and email are required"`

If the data is valid, the server:

- creates a new ID
- adds the user to the array
- returns status `201`

### `PATCH /users/:id`

This route updates an existing user.

We can update:

- `name`
- `email`

If the user does not exist, the server returns `404`.

### `DELETE /users/:id`

This route removes a user from the array.

If the user exists, the deleted user is returned in the response.

If the user does not exist, the server returns `404`.

## Important Note About Data

This project does not use a real database.

The `users` data is stored only in memory inside the `users.js` file. That means:

- changes are temporary
- when the server restarts, the data resets
- this is good for learning, but not for production

This is a common first step when learning backend development because it lets us focus on Express before adding a database.

## Packages We Used

### `express`

The main framework we used to build the server and routes.

### `helmet`

Adds helpful security headers.

### `cors`

Allows the API to be accessed from other origins, such as a frontend app running on another port.

### `compression`

Compresses server responses to improve performance.

## How To Run The Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Or run it in watch mode:

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

## How To Test The API

We created a file called `test.http`.

This file contains example requests for:

- getting all users
- getting one user
- creating a user
- updating a user
- deleting a user

If your code editor supports `.http` files, you can run these requests directly from the editor.

For extra examples, see [CODE_EXAMPLES.md](/home/dev-ori/courses/nodejs/express-project/CODE_EXAMPLES.md).

## Summary

In this class, we built a small Express API and practiced the basic structure of a backend project.

We learned how to:

- start an Express server
- organize code into files
- create routes
- handle request data
- return status codes
- build CRUD operations
- use middleware for missing routes and errors

This project is a strong first step toward building larger backend applications with real databases and more advanced features.
