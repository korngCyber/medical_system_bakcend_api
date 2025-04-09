const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");

const ProductImage = sequelize.sequelize.define(
    "ProductImage",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "tb_product_images",
        timestamps: false,
    }
);

module.exports = ProductImage;