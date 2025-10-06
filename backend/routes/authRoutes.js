import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user });
  

});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

router.get("/role/:id", async (req, res) => {
  try {
    const userId = req.params.id; // 👈 Get user ID from path variable

    const user = await User.findById(userId).select("name email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      name: user.name,
      email: user.email,
      role: user.role 
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/role/:id", async (req, res) => {
  try {
    const { id } = req.params; // 👈 user ID to update
    const { role } = req.body; // 👈 new role (e.g., "admin" or "user")

    // ✅ Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ✅ Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("name email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
