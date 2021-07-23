const mongoose = require("mongoose");
const netBankingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
        unique: true,
    },
    mname: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    branchName: {
        type: String,
        required: true,
    },
    branchCity: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    accountNo: {
        type: Number,
        required: true,
    },
    CIF: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        default: 10000,
    },
    IFSC: {
        type: Number,
        required: true,
    },
    CRN: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});
module.exports = netBankingSchema;
