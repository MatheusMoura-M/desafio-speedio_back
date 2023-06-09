import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleError } from "./error";
import { getRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(handleError);

export default app;
