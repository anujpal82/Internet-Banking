const mongoose = require('mongoose')


const statementSchema = new mongoose.Schema({

    date: {
        type: Date
    },
   month: {
        type: Date
    },
   year: {
        type: Date
    },
  date1: {
        type: Date
    },
  day: {
        type: Date
    },
    amount: {
        type: Number
    },
    debitAccountNo:{
        type:Number
    },
    creditAccountNo:{
        type:Number
    },
    type:{
        type:String
    },
    dname:{
        type:String
    },
    cname:{
        type:String
    }


})

module.exports = statementSchema;