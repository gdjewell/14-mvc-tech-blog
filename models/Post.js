const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { post } = require("../controllers");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },

  {
    sequelize,
    underscored: true,
    modelName: "post",
    freezeTableName: true,
  }
);

module.exports = Post;
