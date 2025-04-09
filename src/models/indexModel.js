const { sequelize } = require("../configs/connectionDB");
const Category = require("./categoryModel");
const Product = require("./productModel");
const Customer = require("./customerModel");
const Order = require("./orderModel");
const OrderDetails = require("./orderDetail");
const ProductImage = require("./productImage");

// Define relationships

// Category and Product
Category.hasMany(Product, { foreignKey: "catId", as: "products" });
Product.belongsTo(Category, { foreignKey: "catId", as: "category" });

// Product and ProductImage
Product.hasMany(ProductImage, { foreignKey: "proId", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "proId", as: "product" });

// Customer and Order
Customer.hasMany(Order, { foreignKey: "cusId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "cusId", as: "customer" });

// Order and Product (through OrderDetails)
Order.belongsToMany(Product, {
  through: OrderDetails,
  foreignKey: "orderId",
  otherKey: "proId",
  as: "products",
});
Product.belongsToMany(Order, {
  through: OrderDetails,
  foreignKey: "proId",
  otherKey: "orderId",
  as: "orders",
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  Category,
  Product,
  Customer,
  Order,
  OrderDetails,
  ProductImage,
};
