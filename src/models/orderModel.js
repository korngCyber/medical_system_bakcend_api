const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Product = require("./productModel");
const OrderDetails = require("./orderDetail");

const Order = sequelize.sequelize.define(
    "order",
    {
        orderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        orderStatus: {
            type: DataTypes.STRING,
            defaultValue: "pending",
            allowNull: false,
        },
        orderTotalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        orderPaymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderShipping: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderPaymentStatus: {
            type: DataTypes.STRING,
            defaultValue: "unpaid",
            allowNull: false,
        },
        cusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "tb_orders",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
    }
);

// Define relationships
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

module.exports = Order;