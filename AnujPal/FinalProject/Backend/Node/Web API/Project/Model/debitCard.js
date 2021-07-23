const mongoose = require('mongoose')

const debitCardSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true
    },
    CRN: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        required: true
    },
 
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    }
})

module.exports = debitCardSchema