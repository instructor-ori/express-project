import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { notFound } from "./middleware/not-found.js";
import { onError } from "./middleware/on-error.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());

app.use(cors({ origin: "*" }));

app.use("/users", usersRouter);

app.use(notFound);
app.use(onError);

export default app;
