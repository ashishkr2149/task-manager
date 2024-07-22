import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  uId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  column: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    required: true,
  },
  dueDate: {
    type: Date,
  },
  reminder: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("tasks", taskSchema);
export default Task;
