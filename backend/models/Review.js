// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;  // Default export
