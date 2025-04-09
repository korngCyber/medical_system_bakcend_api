const Customer = require('../models/customerModel');
const CustomerService = require('../services/customerService');
const path = require("path");


class CustomerController{
    async create(req, res) {
        try {
            console.log("Request Body:", req.body); // Log the request body
            console.log("Uploaded File:", req.file); // Log the uploaded file details

            const data = req.body;

            // Handle image upload
            if (req.file) {
                data.cusImage = path.join("upload", req.file.filename);
            }

            const customer = await CustomerService.createCustomer(data);
            console.log("Customer Created:", customer); // Log the created customer

            return res.status(201).json({
                message: "Customer created successfully",
                data: customer,
            });
        } catch (error) {
            console.error("Error in create method:", error); // Log the error
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            console.log("Request Params:", req.params); // Log the request parameters
            console.log("Request Body:", req.body); // Log the request body
            console.log("Uploaded File:", req.file); // Log the uploaded file details

            const data = req.body;

            // Handle image upload
            if (req.file) {
                data.cusImage = path.join("upload", req.file.filename);
            }

            const customer = await CustomerService.updateCustomer(req.params.id, data);
            console.log("Customer Updated:", customer); // Log the updated customer

            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }

            return res.status(200).json({
                message: "Customer updated successfully",
                data: customer,
            });
        } catch (error) {
            console.error("Error in update method:", error); // Log the error
            return res.status(500).json({ message: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const customers = await CustomerService.getAllCustomers(req.query);
            return res.status(200).json(customers);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const customer = await CustomerService.getCustomerById(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(200).json(customer);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async remove(req, res) {
        try {
            const customer = await CustomerService.deleteCustomer(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(200).json({ message: "Customer was deleted" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getCustomerById(req, res) {
        try {
            const customer = await CustomerService.getCustomerById(req.params.id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            return res.status(200).json(customer);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    
}
module.exports = new CustomerController();