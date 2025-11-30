const express = require("express");
const Flight = require("../models/Flight");
const { authRequired, adminRequired } = require("../middleware/auth");

const router = express.Router();

// GET all flights
router.get("/", authRequired, adminRequired, async (req, res) => {
  try {
    const flights = await Flight.find().sort({ date: 1, departTime: 1 });
    res.json(flights);
  } catch (err) {
    console.error("Get flights error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE flight
router.post("/", authRequired, adminRequired, async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    console.error("Create flight error:", err);
    res
      .status(400)
      .json({ message: "Invalid flight data", error: err.message });
  }
});

// ✅ UPDATE flight
router.put("/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Update flight error:", err);
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

// DELETE flight
router.delete("/:id", authRequired, adminRequired, async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (err) {
    console.error("Delete flight error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
