const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/todo-list").then(() => {
    console.log("Connected to MongoDB");    
}).catch(err => {
    console.error("MongoDB connection error:", err);
})

const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    res.redirect("/todos");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});