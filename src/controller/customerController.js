const Customer = require('../models/customerModel');
const CustomerService = require('../services/customerService');

class CustomerController{
    async create(req, res) {
        try {
            const customer = await CustomerService.createCustomer(req.body);
            return res.status(201).json(customer);
        } catch (error) {
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
    async update(req, res) {
        try {
            const customer = await CustomerService.updateCustomer(req.params.id, req.body);
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
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
   
    async getCustomerById(id) {
        return await Customer.findOne({ where: { customerId: id } });
    }
    
    
}
module.exports = new CustomerController();