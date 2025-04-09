const orderService = require("../services/orderService");
const Order = require("../models/orderModel");


class orderController{
    
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            return res.status(201).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders(req.query);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getOneOrder(req, res) {
        try {
            const order = await orderService.getOrderById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async updateOrder(req, res) {
        try {
            const order = await orderService.updateOrder(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async deleteOrder(req, res) {
        try {
            const order = await orderService.deleteOrder(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getOrderById(id) {
        return await Order.findOne({ where: { orderId: id } });
    }
}
module.exports = new orderController();