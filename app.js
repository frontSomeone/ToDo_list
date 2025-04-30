require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGODB_URI || "your-fallback-mongodb-uri";
mongoose.connect(mongoUri).then(() => {
    console.log("Connected to MongoDB");    
}).catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
})

app.set("views", __dirname + "/views");
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