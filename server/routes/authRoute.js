import express from "express";
import { registerController } from "../controllers/authControllers.js";

//Router Object
const router = express.Router();

//Routes
router.post("/register", registerController);

export default router;
