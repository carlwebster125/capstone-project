const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const authRoutes = require("./routes/authRoutes");
require("dotenv").config({
  path: "../.env",
});
const app = express();
const PORT = process.env.PORT;
const path = require("path");

app.use(cors());
// app.use(authRoutes);
let staticPath = "../client/public";

if (process.env.NODE_ENV === "production") {
  staticPath = "../client/build";
}
app.use(express.static(path.join(__dirname, staticPath)));

// Getting data from API //
app.get("/pokemon/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Pokemon:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, staticPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
