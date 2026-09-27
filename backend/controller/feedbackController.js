const Feedback = require("../models/feedbackModel");


// CREATE FEEDBACK
const createFeedback = async (req, res) => {
    try {

        const { name, rating, comment } = req.body;

        if (!name || !rating || !comment) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const feedback = await Feedback.create({
            name,
            rating,
            comment
        });

        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to submit feedback"
        });
    }
};


// GET ALL FEEDBACK
const getFeedback = async (req, res) => {
    try {

        const { search, rating } = req.query;

        let query = {};

        // Search by name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by rating
        if (rating) {
            query.rating = Number(rating);
        }

        const feedback = await Feedback.find(query).sort({
            createdAt: -1
        });

        res.status(200).json(feedback);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get feedback"
        });
    }
};


// GET FEEDBACK BY ID
const getFeedbackById = async (req, res) => {
    try {

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json(feedback);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get feedback"
        });
    }
};


// UPDATE FEEDBACK
const updateFeedback = async (req, res) => {
    try {

        const { name, rating, comment } = req.body;

        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            {
                name,
                rating,
                comment
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            message: "Feedback updated successfully",
            feedback
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update feedback"
        });
    }
};


// DELETE FEEDBACK
const deleteFeedback = async (req, res) => {
    try {

        const feedback = await Feedback.findByIdAndDelete(
            req.params.id
        );

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            message: "Feedback deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete feedback"
        });
    }
};


// GET FEEDBACK STATISTICS
const getFeedbackStats = async (req, res) => {
    try {

        const feedback = await Feedback.find();

        const totalFeedback = feedback.length;

        if (totalFeedback === 0) {
            return res.status(200).json({
                totalFeedback: 0,
                averageRating: 0
            });
        }

        const totalRating = feedback.reduce(
            (sum, item) => sum + item.rating,
            0
        );

        const averageRating = (
            totalRating / totalFeedback
        ).toFixed(1);

        res.status(200).json({
            totalFeedback,
            averageRating: Number(averageRating)
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to get statistics"
        });
    }
};


module.exports = {
    createFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getFeedbackStats
};