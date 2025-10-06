import express from "express";
import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Book a flight
router.post("/", protect, async (req, res) => {
  const { flightId, seats } = req.body;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: "Flight not found" });
  if (flight.seatsAvailable < seats)
    return res.status(400).json({ message: "Not enough seats available" });

  const totalPrice = seats * flight.price;

  const booking = await Booking.create({
    user: req.user._id,
    flight: flightId,
    seats,
    totalPrice,
  });

  flight.seatsAvailable -= seats;
  await flight.save();

  res.json(booking);
});

// Get all bookings of a user
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("flight")
    .sort({ createdAt: -1 }); // newest bookings first
  res.json(bookings);
});

// DELETE /api/bookings/:id - Cancel a booking
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Ensure the booking belongs to the logged-in user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Restore seats to the flight
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.seatsAvailable += booking.seats;
      await flight.save();
    }

    // Delete the booking
    await booking.deleteOne();

    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
