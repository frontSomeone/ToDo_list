const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todo-list").then(() => {
    console.log("Connected to MongoDB");    
}).catch(err => {
    console.error("MongoDB connection error:", err);
})

const db = mongoose.connection;
let todos = [];

const getTodos = async () => {
    try {
        todos = await db.collection("todos").find().toArray();
        console.log("Todos:", todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

const createTodo = async (title, description) => {
    const todo = {
        title,
        description,
        completed: false
    };
    try {
        const result = await db.collection("todos").insertOne(todo);
        console.log("Todo created:"), result.insertedId;
        getTodos();
    } catch (error) {
        console.error("Error creating todo:", error);
    }
};

const updateTodo = async (id, updates) => {
    try {
        const result = await db.collection("todos").updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: updates }
        );
        console.log("Todo updated:", result.modifiedCount);
        getTodos()
    } catch (error) {
        console.error("Error updating todo:", error);
    }
}

const deleteTodo = async (id) => {
    try {
        const result = await db.collection("todos").deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        console.log("Todo deleted:", result.deletedCount);
        getTodos()
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}