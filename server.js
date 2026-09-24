const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();


// Middleware
app.use(express.json());


// Routes
app.use("/api", feedbackRoutes);


// Home route
app.get("/", (req, res) => {
    res.send("Student Feedback API is running");
});


// Port
const PORT = process.env.PORT || 5000;


// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });