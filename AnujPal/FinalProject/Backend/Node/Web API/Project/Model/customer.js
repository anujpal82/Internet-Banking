const mongoose=require('mongoose')
const account=require("../Model/account");
const Account=mongoose.model('Account',account);
// const account = require("../Model/account")
// const Account = mongoose.model('Accounts', account)
const customerSchema= new mongoose.Schema({
  custId:{
      type:Number,
      required:true,
      unique:true
  },
  account:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Account'
  },
  phoneNo:{
      type:String,
      required:true
  },
  city:{
      type:String
  }

})

module.exports=customerSchema;