const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Customer = require("../models/customerModel");

class CustomerService {
    async createCustomer(data) {
        return await sequelize.sequelize.transaction(async (t) => {
            return Customer.create(data, { transaction: t });
        });
    }
    async getAllCustomersByRole(query = {}, role) {
        const {
            search,
            status,
            sortBy = "created_at",
            sortOrder = "DESC",
            limit = 10,
            page = 1,
        } = query;

        const offset = (page - 1) * limit;

        const where = {
            cusRole: role // Add role filter
        };

        if (search) {
            where.customerName = { [Op.like]: `%${search}%` };
        }
        if (status) {
            where.customerStatus = status;
        }

        const result = await Customer.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortBy, sortOrder]],
        });

        return {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: parseInt(page),
            customers: result.rows,
        };
    }
    async getAllCustomers(query = {}) {
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
            where.customerName = { [Op.like]: `%${search}%` };
        }
        if (status) {
            where.customerStatus = status;
        }

        const result = await Customer.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sortBy, sortOrder]],
        });

        return {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: parseInt(page),
            customers: result.rows,
        };
    }
    async getCustomerById(id) {
        return await Customer.findOne({ where: { cusId: id } }); // Use 'cusId' instead of 'customerId'
    }
    async updateCustomer(id, data) {
        return await sequelize.sequelize.transaction(async (t) => {
            const customer = await Customer.findByPk(id);
            if (!customer) return null;

            await customer.update(data, { transaction: t });
            return customer;
        });
    }
    async deleteCustomer(id) {
        return await sequelize.sequelize.transaction(async (t) => {
            const customer = await Customer.findByPk(id);
            if (!customer) return null;

            await customer.destroy({ transaction: t });
            return customer;
        });
    }
   
}
module.exports = new CustomerService();
