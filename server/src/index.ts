import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

// app & port
const app: Application = express();
const PORT = process.env.PORT ?? 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// apis
app.get("/", (req: Request, res: Response) => {
  res.status(201).send({ message: "Hello from express" });
});

// server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
