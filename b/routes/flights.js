const express = require("express");
const Flight = require("../models/Flight.js");

const router = express.Router();

// GET /api/flights/search?from=DEL&to=BOM&date=2025-11-28
router.get("/search", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
      return res
        .status(400)
        .json({ message: "from, to, and date query params are required" });
    }

    const flights = await Flight.find({
      fromCode: from.toUpperCase(),
      toCode: to.toUpperCase(),
      date,
    }).sort({ departTime: 1 });

    res.json(flights);
  } catch (err) {
    console.error("Flight search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
