import express from "express";
import FlightCompany from "../models/FlightCompany.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new flight company (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { name, category, country, code } = req.body;

    // Create flight company for any authenticated user
    const company = await FlightCompany.create({ name, category, country, code });

    res.status(201).json(company);
  } catch (error) {
    console.error("Error creating flight company:", error);
    res.status(500).json({ message: "Error creating flight company", error });
  }
});

// Get all flight companies
router.get("/", async (req, res) => {
  try {
    const companies = await FlightCompany.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
});

// Get flight companies by category
router.get("/category/:category", async (req, res) => {
  try {
    const companies = await FlightCompany.find({ category: req.params.category });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies by category", error });
  }
});

export default router;
