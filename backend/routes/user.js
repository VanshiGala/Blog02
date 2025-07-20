import { Router } from "express";
import User from "../models/user.js";
import { checkForAuthentiationCookie } from "../middlewares/authentication.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = await User.create({ fullName, email, password });
    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  console.log("Received body:", req.body);
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token, {
      httpOnly: true,
    }).json({ message: "Login successful" });
  } catch (err) {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});
router.get("/", checkForAuthentiationCookie("token"), async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });

  res.json({ user: req.user });
});

export default router;
