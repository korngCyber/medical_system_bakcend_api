const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Product = require("./productModel");

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
        proDescription: {
            type: DataTypes.STRING,
            allowNull: true,
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

// Define relationships
Category.hasMany(Product, { foreignKey: "catId", as: "products" });
Product.belongsTo(Category, { foreignKey: "catId", as: "category" });

module.exports = Category;