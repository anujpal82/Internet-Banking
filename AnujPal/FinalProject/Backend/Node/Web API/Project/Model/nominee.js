const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema({
  accountNo: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  equity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:'Pending'
  }
  
  
});

module.exports = nomineeSchema;
