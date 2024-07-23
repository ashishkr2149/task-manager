import Task from "../models/TaskModel.js";
import Identifier from "../models/identifierModel.js";

// Get all tasks with sorting
export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific task by uId
export const getTaskController = async (req, res) => {
  const { uId } = req.params;

  try {
    const task = await Task.findOne({ uId });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a new task
export const addTaskController = async (req, res) => {
  const { title, description, column, dueDate, reminder } = req.body;

  // Validation for required fields
  if (!title || !description || !column) {
    return res
      .status(400)
      .json({ error: "Title, description, and column are required" });
  }

  // Validation for column value
  if (!["To Do", "In Progress", "Done"].includes(column)) {
    return res.status(400).json({ error: "Invalid column" });
  }

  try {
    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(200).send({
        success: true,
        message: "Task already exists with this title",
      });
    }
    const identifierDoc = await Identifier.findOneAndUpdate(
      { name: "task" },
      { $inc: { lastIdentifier: 1 } },
      { new: true, upsert: true }
    );

    const uId = identifierDoc.lastIdentifier.toString().padStart(4, "0");

    const newTask = new Task({
      title,
      description,
      column,
      dueDate,
      reminder,
      uId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing task by uId
export const updateTaskController = async (req, res) => {
  const { uId } = req.params;
  const { title, description, column, dueDate, reminder } = req.body;

  // Validation for column value
  if (column && !["To Do", "In Progress", "Done"].includes(column)) {
    return res.status(400).json({ error: "Invalid column" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { uId },
      { title, description, column, dueDate, reminder },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Error updating task", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a task by uId
export const deleteTaskController = async (req, res) => {
  const { uId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ uId });
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Move a task to a different column by uId
export const moveTaskController = async (req, res) => {
  const { uId } = req.params;
  const { targetColumn } = req.body;

  // Validation for targetColumn value
  if (!["To Do", "In Progress", "Done"].includes(targetColumn)) {
    return res.status(400).json({ error: "Invalid column" });
  }

  try {
    const task = await Task.findOne({ uId });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.column = targetColumn;
    task.updatedAt = Date.now();
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
