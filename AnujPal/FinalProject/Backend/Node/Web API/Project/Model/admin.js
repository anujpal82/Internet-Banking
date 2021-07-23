const mongoose = require("mongoose");
const admin = new mongoose.Schema({
  userId: {
    type: String,
  },
  password:{
      type:String
  },
  email:{
      type:String
  }
});

module.exports = admin;
