const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");

const Category = sequelize.sequelize.define(
  "category",
  {
    catId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tb_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
  }
);

module.exports = Category;
