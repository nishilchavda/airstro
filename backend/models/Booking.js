import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
  bookingDate: { type: Date, default: Date.now },
  seats: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export default mongoose.model("Booking", bookingSchema);
