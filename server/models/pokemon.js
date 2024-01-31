const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Pokemon = sequelize.define("Pokemon", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Pokemon;
