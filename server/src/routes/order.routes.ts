// order routes

import { Router } from "express";
import { isValidated } from "../middlewares/auth";
import { getAllOrders } from "../controllers/order.controller";


const router = Router()

// get all orders
router.get("/all",isValidated,getAllOrders)


export {router as orderRoutes}
