import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";
import { requireSignin } from "../middlewares/authMiddleware.js";

//Router Object
const router = express.Router();

//Routes
router.post("/register", registerController);
router.post("/login", loginController);

//Protected Route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
