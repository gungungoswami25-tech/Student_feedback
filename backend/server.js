const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Serve the frontend from the same origin as the API.
app.use(express.static(path.join(__dirname, "../frontend")));


// Routes
app.use("/api", feedbackRoutes);


// Home route
app.get("/", (req, res) => {
    res.send("Student Feedback API is running");
});


// Port
const PORT = process.env.PORT || 5000;


// Start the HTTP server even if MongoDB is temporarily unavailable. This keeps
// the frontend reachable and lets the API report database errors normally.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
