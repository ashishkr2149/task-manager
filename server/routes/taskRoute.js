import express from "express";
import {
  addTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskController,
  moveTaskController,
  updateTaskController,
} from "../controllers/taskControllers.js";

//Router Object
const router = express.Router();

//Routes
router.get("/tasks", getAllTasksController);
router.get("/task/:uId", getTaskController);
router.post("/add-tasks", addTaskController);
router.put("/task/:uId/update", updateTaskController);
router.delete("/task/:uId", deleteTaskController);
router.put("/task/:uId/move", moveTaskController);

export default router;
