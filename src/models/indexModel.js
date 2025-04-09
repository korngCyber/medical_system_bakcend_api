// src/models/index.js
// const sequelize = require("../configs/connectionDB");
const Category = require("./categoryModel");
const Customer = require("./customerModel");
const Order = require("./orderModel");
const OrderDetails = require("./orderDetail");
const Product = require("./productModel");
const ProductImage = require("./productImage");
// indexModel.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
module.exports = { sequelize };
module.exports = { sequelize };

module.exports = {
    sequelize,
    Category,
    Customer,
    Order,
    OrderDetails,
    Product,
    ProductImage,
};