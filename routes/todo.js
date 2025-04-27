const  express = require("express");
const router = express.Router();
const todoController = require("../controllers/controllerToDo");

router.get("/", todoController.getTodo);

router.post("/", todoController.createTodo);

router.put("/update/:id", todoController.updateTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;