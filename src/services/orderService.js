const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Order = require("../models/orderModel");
const OrderDetails = require("../models/orderDetail");

class OrderService {
    async createOrder(data) {
        return await sequelize.sequelize.transaction(async (t) => {
            return Order.create(data, { transaction: t });
        });
    }
    async getAllOrders(query = {}) {
        const {
            search,
            status,
            sortBy = "created_at",
            sortOrder = "DESC",
            limit = 10,
            page = 1,
        } = query;

        const offset = (page - 1) * limit;

        const where = {};
        if (search) {
            where.orderName = { [Op.like]: `%${search}%` };
        }
        if (status) {
            where.orderStatus = status;
        }

        const result = await Order.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortBy, sortOrder]],
        });

        return {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: parseInt(page),
            orders: result.rows,
        };
    }
    async getOrderById(id) {
        return await Order.findOne({ where: { orderId: id } });
    }
    async updateOrder(id, data) {
        return await sequelize.sequelize.transaction(async (t) => {
            const order = await Order.findByPk(id);
            if (!order) return null;

            await order.update(data, { transaction: t });
            return order;
        });
    }
    async deleteOrder(id) {
        return await sequelize.sequelize.transaction(async (t) => {
            const order = await Order.findByPk(id);
            if (!order) return null;

            await order.destroy({ transaction: t });
            return order;
        });
    }

}
module.exports = new OrderService();
