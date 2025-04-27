const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/todo-list").then(() => {
    console.log("Connected to MongoDB");    
}).catch(err => {
    console.error("MongoDB connection error:", err);
})

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    res.redirect("/todos");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});