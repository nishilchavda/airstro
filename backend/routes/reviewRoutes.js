import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1️⃣ Add a review (Authenticated user)
router.post("/", protect, async (req, res) => {
  console.log("Incoming review body:", req.body); // 👈 Add this
  try {
    const { flightId, rating, comment } = req.body;

    if (!flightId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      user: req.user._id,
      flight: flightId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
});


// 2️⃣ Get all reviews (optional: newest first)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 }); // newest first
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
});


export default router;
