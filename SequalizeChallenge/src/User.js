const { Sequelize, DataTypes, Model } = require("sequelize");

// Initialize Sequelize instance
const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/fundmore"
);

// Define the User model
class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

// Export the User model and sequelize instance
module.exports = { User, sequelize };
