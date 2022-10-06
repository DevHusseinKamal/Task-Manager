const { validationResult } = require("express-validator/check");

const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const createCustomError = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.getTasks();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const name = req.body.name;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg;
    return next(createCustomError(errorMessage, 422));
  }

  const task = new Task(name, false);
  await task.save();
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);
  if (!task) {
    throw createCustomError("Task is not exist!", 404);
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const name = req.body.name;
  const completed = req.body.completed;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg;
    return next(createCustomError(errorMessage, 422));
  }

  const task = new Task(name, completed, taskId);
  await task.save();
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors[0].msg;
    return next(createCustomError(errorMessage, 422));
  }

  const task = await Task.deleteById(taskId);
  if (!task) {
    throw createCustomError("Task is not exist!", 404);
  }
  res.status(200).json({ task: null, status: "success" });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
