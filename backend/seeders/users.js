"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Priscilla24!",
          email: "priscilla24@example.com",
          password: bcrypt.hashSync("actual_password24", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Hambone25!",
          email: "hambone25@example.com",
          password: bcrypt.hashSync("actual_password25", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
