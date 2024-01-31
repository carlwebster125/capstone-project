const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({ username, password });
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
