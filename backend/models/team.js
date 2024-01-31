const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Team = sequelize.define("Team", {});

User.hasMany(Team);
Team.belongsTo(User);

Pokemon.belongsToMany(Team, { through: "PokemonTeam" });
Team.belongsToMany(Pokemon, { through: "PokemonTeam" });

module.exports = Team;
