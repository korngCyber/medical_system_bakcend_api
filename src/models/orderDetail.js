const { DataTypes } = require("sequelize");
const sequelize = require("../configs/connectionDB");

const OrderDetails = sequelize.sequelize.define(
    "order_details",
    {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        proId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "tb_order_details",
        timestamps: false,
    }
);

module.exports = OrderDetails;