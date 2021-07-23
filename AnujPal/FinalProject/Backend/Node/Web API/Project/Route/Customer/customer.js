const mongoose = require("mongoose")
const express = require('express')
const customerRouter = express.Router();
customerRouter.use(express())
const customer = require("../../Model/customer");
const Customer = mongoose.model('Customer', customer)
const verifyToken = require("../../Middleware/verifyToken");
const ensureToken = require("../../Middleware/ensureToken");

class demoCustomer {

    static async insertCustomer(req, res) {
        const customer = new Customer({ custId: req.body.custId, phoneNo: req.body.phoneNo, city: req.body.city, account: req.body.account })
        const a1 = customer.save();
        res.json(customer);
    }
    static async getAllCustomer(req, res) {
        const customers = await Customer
            .find()
        res.json(customers)
    }

    static async getCustomerbyId(req, res) {
        const customers = await Customer
            .find({ custId: req.params.id })
        res.json(customers)
    }

    static async deleteCustomer(req, res) {
        const customers = await Customer
            .deleteOne({ custId: req.params.id })
        res.json(customers)
    }
    static async balance(req, res) {
        const customers = await Customer
            .find({ custId: req.params.custId })
            .populate('account', 'balance accountHolderName -_id')
            .select('custId -_id')
        res.json(customers);
    }
}
// Api for inserting new customer
customerRouter.post("/insertCustomer",verifyToken,ensureToken , demoCustomer.insertCustomer)

// API for getting all the customers
customerRouter.get("/getAllCustomer", verifyToken,ensureToken,  demoCustomer.getAllCustomer)

// API for getting a particular customer
customerRouter.get("/getCustomerbyId/:id",verifyToken,ensureToken,  demoCustomer.getCustomerbyId)

//API for deleting the existing customer
customerRouter.get("/deleteCustomer/:id",verifyToken,ensureToken,  demoCustomer.deleteCustomer)

// API for view balance
customerRouter.get("/balance/:custId", verifyToken, ensureToken, demoCustomer.balance)




module.exports = customerRouter;