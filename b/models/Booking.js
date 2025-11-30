const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },

    tripType: { type: String, enum: ["oneWay", "roundTrip"], required: true },
    classType: { type: String, enum: ["economy", "business"], required: true },

    passengers: { type: Number, default: 1 },
    departureDate: { type: String, required: true },
    returnDate: { type: String }, // only for roundTrip

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
