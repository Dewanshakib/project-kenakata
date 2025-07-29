import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { userRoutes } from "./routes/user.Routes";

// app & port
const app: Application = express();
const PORT = process.env.PORT ?? 5000;

// middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// apis
app.use("/api/users",userRoutes)

// server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
