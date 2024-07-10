const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("./User"); // Import sequelize instance from User.js

// Define the Post model
class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

// Establish a one-to-many relationship between User and Post
const { User } = require("./User");
User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});
Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Export the Post model
module.exports = Post;
