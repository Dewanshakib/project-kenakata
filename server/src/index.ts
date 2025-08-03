import express, { Application} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { userRoutes } from "./routes/user.routes";
import { orderRoutes } from "./routes/order.routes";


// app & port
const app: Application = express();
const PORT = process.env.PORT ?? 5000;

// middlewares
app.use(express.json());
app.use(cookieParser()); 
app.use(helmet()) 
app.use(cors({ credentials: true,origin:process.env.FRONTEND_SERVER! }));


// apis
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)

// server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
