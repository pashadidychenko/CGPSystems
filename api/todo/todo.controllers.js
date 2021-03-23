const Joi = require("joi");
const todoModel = require("./todo.schema");
const {
  Types: { ObjectId },
} = require("mongoose");

module.exports = class todoControllers {
  // Great new todo
  static async creatTodo(req, res, next) {
    try {
      const todo = await todoModel.create(req.body);
      return res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  }

  // Validate new todo
  static validateCreateTodo(req, res, next) {
    const createTodoRules = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      date: Joi.string().required(),
      category: Joi.string(),
    });
    const result = createTodoRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details);
    }
    next();
  }

  // Get Todo list
  static async getTodoList(req, res, next) {
    try {
      const todo = await todoModel.find();
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  // Update Todo by ID
  static async updateTodo(req, res, next) {
    try {
      const todo = await todoModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      return res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }

  // Check todo in list
  static async checkTodoInList(req, res, next) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Not found" });
    }
    next();
  }

  // Check data exist
  static checkDataExist(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
  }

  // Validate update todo
  static validateUpdateTodo(req, res, next) {
    const updateTodoRules = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      date: Joi.string().required(),
      category: Joi.string(),
    });
    const result = updateTodoRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details);
    }
    next();
  }

  // Delete todo by ID
  static async deleteTodo(req, res, next) {
    try {
      const todo = await todoModel.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Todo alredy deleted" });
      }
      return res.status(200).json({ message: "Todo deleted" });
    } catch (err) {
      next(err);
    }
  }

  // Get todo by category
  static async getTodoByCategory(req, res, next) {
    try {
      const todo = await todoModel.find();
      const todoList = todo.filter(
        (el) => el.category.toLowerCase() === req.params.search.toLowerCase()
      );
      if (!todoList.length) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res
        .status(200)
        .json(todoList.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      next(err);
    }
  }

  static async getTodoCategory(req, res, next) {
    try {
      const todo = await todoModel.find();
      const todoList = todo.map((el) => el.category.toLowerCase());
      if (!todoList.length) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(Array.from(new Set(todoList)));
    } catch (err) {
      next(err);
    }
  }
};
