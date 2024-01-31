const bcrypt = require("bcrypt");
const { User } = require("../models");

const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Hashing the password before saving to database //
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creating a new user with a hashed password //
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.json({ message: "Registration successful", user: newUser });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed. Please try again." });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email //
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Checking if the provided password matches the stored password //
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ message: "Login successful", user });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  },
};

module.exports = authController;
