const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.render("index", { todos });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createTodo = async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new Todo({
        title,
        description
    });
    try {
        await newTodo.save();
        res.redirect("/todos");
    } catch (error) {
        res.status(500). send(error);
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        await Todo.findByIdAndUpdate(id, { title, description, completed: completed === "on" });
        res.redirect("/todos");
    } catch (error) {
        res.status(500). send(error);
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.redirect("/todos");
    } catch (error) {
        res.status(500).send(error);
    }
};