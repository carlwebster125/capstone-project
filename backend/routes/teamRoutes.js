const express = require("express");
const { Team, Pokemon } = require("../models");

const router = express.Router();

// Creating a new team //
router.post("/", async (req, res) => {
  try {
    const newTeam = await Team.create();
    res.json(newTeam);
  } catch (error) {
    console.error("Team creation error:", error);
    res.status(500).json({ error: "Team creation failed. Please try again." });
  }
});

// Adding Pokemon to a team //
router.post("/:teamId/pokemon", async (req, res) => {
  const { teamId } = req.params;
  const { pokemonId } = req.body;

  try {
    const team = await Team.findByPk(teamId);
    const pokemon = await Pokemon.findByPk(pokemonId);

    if (!team || !pokemon) {
      return res.status(404).json({ error: "Team or Pokemon not found" });
    }

    await team.addPokemon(pokemon);
    res.json({ message: "Pokemon added to team" });
  } catch (error) {
    console.error("Error adding Pokemon to team:", error);
    res
      .status(500)
      .json({ error: "Failed to add Pokemon to team. Please try again." });
  }
});

module.exports = router;
