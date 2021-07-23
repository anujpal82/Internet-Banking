const mongoose = require("mongoose");
const account = require("../Model/account");
const Account = mongoose.model("Account", account);
// const account = require("../Model/account")
// const Account = mongoose.model('Accounts', account)
const LoanSchema = new mongoose.Schema({
  loanNo: {
    type: Number,
  },

  CRN: {
    type: Number,
    required: true,
  },

  debitAccountNo: {
    type: Number,
    required: true,
  },
  creditAccountNo: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true

  }, EMI: {
    type: Number
  },
  monthRemaining: {
    type: Number
  }
});

module.exports = LoanSchema;
