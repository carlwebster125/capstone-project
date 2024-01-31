const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 8000;

app.use(cors());
// app.use(authRoutes);

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
