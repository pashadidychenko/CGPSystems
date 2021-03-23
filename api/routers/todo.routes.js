const { Router } = require("express");
const todoRouter = Router();
const todoControllers = require("../todo/todo.controllers");

// Great new todo and add to list
todoRouter.post(
  "/",
  todoControllers.validateCreateTodo,
  todoControllers.creatTodo
);

// Get todo list
todoRouter.get("/", todoControllers.getTodoList);

// Update information in todo
todoRouter.patch(
  "/:id",
  todoControllers.checkTodoInList,
  todoControllers.validateUpdateTodo,
  todoControllers.updateTodo
);

// Delete todo by ID
todoRouter.delete(
  "/:id",
  todoControllers.checkTodoInList,
  todoControllers.deleteTodo
);

// Get category
todoRouter.get("/category", todoControllers.getTodoCategory);

// Find todo by category
todoRouter.get("/:search", todoControllers.getTodoByCategory);

module.exports = todoRouter;
