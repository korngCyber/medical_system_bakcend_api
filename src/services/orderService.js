const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Order = require("../models/orderModel");
const OrderDetails = require("../models/orderDetail");
const Product = require("../models/productModel");

class OrderService {
    async createOrder(data) {
        return await sequelize.sequelize.transaction(async (t) => {
            const { products, ...orderData } = data;

            // Validate product stock
            for (const product of products) {
                const productRecord = await Product.findByPk(product.proId, { transaction: t });
                if (!productRecord) {
                    throw new Error(`Product with ID ${product.proId} not found`);
                }
                if (productRecord.proStock < product.quantity) {
                    throw new Error(`Insufficient stock for product: ${productRecord.proName}`);
                }
            }

            // Create the order
            const order = await Order.create(orderData, { transaction: t });

            // Create order details and deduct stock
            for (const product of products) {
                await OrderDetails.create(
                    {
                        orderId: order.orderId,
                        proId: product.proId,
                        quantity: product.quantity,
                        price: product.price,
                    },
                    { transaction: t }
                );

                // Deduct stock
                const productRecord = await Product.findByPk(product.proId, { transaction: t });
                await productRecord.update(
                    { proStock: productRecord.proStock - product.quantity },
                    { transaction: t }
                );
            }

            return order;
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
