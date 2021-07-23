const mongoose = require("mongoose");
const account = require("../Model/account");
const Account = mongoose.model("Account", account);
// const account = require("../Model/account")
// const Account = mongoose.model('Accounts', account)
const BenficiarySchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },

  mname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },

  CRN: {
    type: Number,
    required: true,
  },
  IFSC: {
    type: Number,
    required: true,
  },
  accountNo: {
    type: Number,
    required: true,
  }
 
});

module.exports = BenficiarySchema;
