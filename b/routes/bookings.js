const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const { authRequired, adminRequired } = require("../middleware/auth");

const router = express.Router();

// POST /api/bookings  (user books a flight)
router.post("/", authRequired, async (req, res) => {
  try {
    const {
      flightId,
      tripType,
      classType,
      passengers,
      departureDate,
      returnDate,
    } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const pricePerSeat =
      classType === "business"
        ? flight.businessPrice
        : flight.economyPrice;

    const totalPrice = pricePerSeat * passengers;

    const booking = await Booking.create({
      user: req.user.id,
      flight: flight._id,
      tripType,
      classType,
      passengers,
      departureDate,
      returnDate: tripType === "roundTrip" ? returnDate : undefined,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/bookings/my  (logged-in user's bookings)
router.get("/my", authRequired, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("flight")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get my bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/bookings (admin: see all bookings with user+flight)
router.get("/admin", authRequired, adminRequired, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "fullName email")
      .populate("flight")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get all bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/bookings/cancel/:id  (user cancels their booking)
router.patch("/cancel/:id", authRequired, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id, // ensure user can cancel only their own booking
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.error("Cancel booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADMIN: update booking (e.g. status, passengers)
router.patch("/admin/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const allowed = ["status", "passengers"]; // we only allow these to be edited
    const update = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });

    const booking = await Booking.findByIdAndUpdate(req.params.id, update, {
      new: true,
    })
      .populate("user", "fullName email")
      .populate("flight");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error("Admin update booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADMIN: delete booking
router.delete("/admin/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("Admin delete booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
