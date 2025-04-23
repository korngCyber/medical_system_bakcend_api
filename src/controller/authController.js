// src/controller/authController.js
const AuthService = require("../services/authService");

class AuthController {
    static async loginStaff(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const staff = await AuthService.loginStaff(email, password);

            res.status(200).json({
                message: "Staff login successful",
                staff: {
                    id: staff.cusId,
                    name: staff.cusName,
                    email: staff.cusEmail,
                    role: staff.cusRole
                }
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    static async loginCustomer(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const customer = await AuthService.loginCustomer(email, password);

            res.status(200).json({
                message: "Login successful",
                customer: {
                    id: customer.cusId,
                    name: customer.cusName,
                    email: customer.cusEmail,
                    role: customer.cusRole
                }
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    static async registerCustomer(req, res) {
        try {
            const customerData = req.body;

            if (!customerData.cusEmail || !customerData.cusPassword) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            const customer = await AuthService.registerCustomer(customerData);

            res.status(201).json({
                message: "Registration successful",
                customer: {
                    id: customer.cusId,
                    name: customer.cusName,
                    email: customer.cusEmail,
                    role: customer.cusRole
                }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;