const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const ProductImage = require("./productImage");

const Product = sequelize.sequelize.define(
    "product",
    {
        proId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        proName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        proDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        proPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        proStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        proStatus: {
            type: DataTypes.STRING,
            defaultValue: "in-stock",
            allowNull: false,
        },
        catId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "tb_products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
    }
);

// Define relationships
Product.hasMany(ProductImage, {
    foreignKey: "proId",
    as: "images",
});
ProductImage.belongsTo(Product, {
    foreignKey: "proId",
});

module.exports = Product;