import express from "express";
import Flight from "../models/Flight.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Flight (Admin)
router.post("/", protect, async (req, res) => {
  const flight = await Flight.create(req.body);
  res.json(flight);
});

// Get all flights
router.get("/", async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

// Update flight (Admin)
router.put("/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get("/search", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    // Convert date string to start/end of day for comparison
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const flights = await Flight.find({
      from: from,            // matches your Flight model field
      to: to,
      departureTime: { $gte: start, $lte: end } // filter flights on that day
    });

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Delete flight (Admin)
router.delete("/:id", protect, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  await Flight.findByIdAndDelete(req.params.id);
  res.json({ message: "Flight deleted" });
});

export default router;
