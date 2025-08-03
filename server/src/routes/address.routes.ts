import { Router } from "express";
import { isValidated } from "../middlewares/auth";
import { addUserAddress, editUserAddress, getUserAddress } from "../controllers/address.controllers";


const router = Router()

// get user address
router.get("/",isValidated,getUserAddress)

// add address
router.post("/add-address", isValidated, addUserAddress)
// edit address
router.put("/edit-address", isValidated, editUserAddress)

export { router as addressRoutes }