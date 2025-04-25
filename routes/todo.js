const  express = require("express");
const router = express.Router();
const todoController = require("../controllers/controllerToDo");

router.get("/tasks", todoController.getTodo);

router.post("/tasks", todoController.createTodo);

router.put("/tasks/:id", todoController.updateTodo);

router.delete("/tasks/:id", todoController.deleteTodo);

module.exports = router;