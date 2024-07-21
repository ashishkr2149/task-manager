import express from "express";
import { registerController, loginController } from "../controllers/authControllers.js";

//Router Object
const router = express.Router();

//Routes
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
