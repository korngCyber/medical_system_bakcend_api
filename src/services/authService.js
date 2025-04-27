const { Op } = require("sequelize");
const sequelize = require("../configs/connectionDB");
const Customer = require("../models/customerModel");

class AuthService {
    static async loginStaff(email, password) {
        const staff = await Customer.findOne({
            where: {
                cusEmail: email,
                cusPassword: password,
                cusRole: "staff",
                cusStatus: true
            }
        });

        if (!staff) {
            throw new Error("Invalid credentials");
        }

        return staff;
    }

    static async loginCustomer(email, password) {
        const customer = await Customer.findOne({
            where: {
                cusEmail: email,
                cusPassword: password,
                cusRole: "customer",
                cusStatus: true
            }
        });

        if (!customer) {
            throw new Error("Invalid credentials");
        }

        return customer;
    }

    static async registerCustomer(customerData) {
        const existingCustomer = await Customer.findOne({
            where: { cusEmail: customerData.cusEmail }
        });

        if (existingCustomer) {
            throw new Error("Email already registered");
        }

        customerData.cusRole = "customer";
        return Customer.create(customerData);
    }
}

module.exports = AuthService;