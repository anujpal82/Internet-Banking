const mongoose = require('mongoose')
const closeAccountSchema = new mongoose.Schema({
    accountNo: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'Pending'
    }

})
module.exports = closeAccountSchema;