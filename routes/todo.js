const  express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const todoController = require("../controllers/controllerToDo");

router.get("/", todoController.getTodo);

router.post("/", 
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").isLength({ max: 200 }).withMessage("Description cannot be longer than 200 characters")
    ]
, todoController.createTodo);

router.put("/update/:id", 
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").isLength({ max: 200 }).withMessage("Description cannot be longer than 200 characters")
    ]
    , todoController.updateTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;