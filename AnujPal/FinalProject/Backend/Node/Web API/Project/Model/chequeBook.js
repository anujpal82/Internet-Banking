const mongoose = require('mongoose')

const chequeBookSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true
    },
    CIF: {
        type: String,
        required: true
    },
    branchName: {
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

module.exports = chequeBookSchema