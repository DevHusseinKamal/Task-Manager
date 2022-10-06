const express = require("express");
const { body, param } = require("express-validator/check");

const router = express.Router();

const Task = require("../models/task");
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const bodyValidate = () =>
  body("name")
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage("Must provide a name")
    .isLength({ max: 20 })
    .withMessage("Name can not be more than 20 characters");

const idValidate = (id) =>
  param(id)
    .isMongoId()
    .custom(async (value) => {
      const existingTask = await Task.findById(value);
      if (!existingTask) {
        return Promise.reject(`Task is not exist!`);
      }
    });

router.get("/", getAllTasks);

router.post("/", [bodyValidate()], createTask);

router.get("/:id", getTask);

router.delete("/:id", [idValidate("id")], deleteTask);

router.patch(
  "/:id",
  [
    idValidate("id"),
    bodyValidate(),
    body("completed")
      .isBoolean()
      .not()
      .isNumeric()
      .withMessage("Must be a true or false"),
  ],
  updateTask
);

module.exports = router;
