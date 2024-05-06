const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  task: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;
