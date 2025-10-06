// src/pages/FlightReview.jsx
import React, { useState, useEffect } from "react";
import { FaStar, FaSpinner } from "react-icons/fa";

// API URL
const API = "http://localhost:5000/api/reviews";

// Format date helper
const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Read-only star rating
const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-5 h-5 ${i < rating ? "opacity-100" : "opacity-40"}`}
      />
    ))}
  </div>
);

const FlightReview = ({ flightId, userToken }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}?flightId=${flightId}`);
        const data = await res.json();
        setReviews(data); // set reviews from API
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [flightId]);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      setError("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Ensure token exists
        },
        // ✅ flightId must match backend key
        body: JSON.stringify({ flightId, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit review");
      }

      const newReview = await res.json();

      // Add the new review at the top
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Flight Reviews</h2>

      {/* Review Form */}
      <form
  onSubmit={handleSubmit}
  className="mb-12 p-6 bg-white rounded-xl shadow-md border border-gray-200"
>
  <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>

  {error && <p className="text-red-500 mb-3">{error}</p>}

  <div className="flex items-center mb-4">
    <label htmlFor="review-rating" className="mr-4 font-medium">Rating:</label>
    {[1, 2, 3, 4, 5].map((i) => (
      <FaStar
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => setRating(i)}
      />
    ))}
  </div>

  <div className="mb-4">
    <label htmlFor="review-comment" className="mr-4 font-medium">Comment:</label>
    <textarea
      id="review-comment"  //<!-- Ensure the id matches the label's 'for' -->
      name="comment"        //<!-- Add a name attribute for form data submission -->
      className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      placeholder="Write your review..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows={4}
    />
  </div>

  <button
    type="submit"
    className={`w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition ${
      submitting ? "opacity-70 cursor-not-allowed" : ""
    }`}
    disabled={submitting}
  >
    {submitting ? "Submitting..." : "Submit Review"}
  </button>
</form>


      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-12 text-indigo-600">
          <FaSpinner className="animate-spin w-8 h-8 mx-auto mb-3" />
          <p>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-6 bg-white rounded-xl shadow-md border-l-4 border-indigo-500 transition hover:shadow-lg"
            >
              <StarRating rating={r.rating} />
              <p className="mt-2 italic text-gray-700">"{r.comment}"</p>
              <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
                <p className="font-semibold text-indigo-600">{r.user?.name}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(r.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightReview;
