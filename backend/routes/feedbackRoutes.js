const express = require("express");

const router = express.Router();

const {
    createFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getFeedbackStats
} = require("../controller/feedbackController");


// CREATE
router.post("/feedback", createFeedback);


// GET ALL + SEARCH + FILTER
router.get("/feedback", getFeedback);


// STATISTICS
router.get("/feedback/stats", getFeedbackStats);


// GET ONE
router.get("/feedback/:id", getFeedbackById);


// UPDATE
router.put("/feedback/:id", updateFeedback);


// DELETE
router.delete("/feedback/:id", deleteFeedback);


module.exports = router;