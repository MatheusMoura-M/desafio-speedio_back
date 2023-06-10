import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./error";
import { linkRoutes, sessionRoutes, userRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/login", sessionRoutes);
app.use("/link", linkRoutes);

app.use(handleError);

export default app;
