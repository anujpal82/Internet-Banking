const mongoose = require('mongoose')
const atmSchema = new mongoose.Schema({
    AtmNumber: {
        type: String,
        required: true,
        unique: true
    },
    AtmHolderName: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    CVV:
    {
        type: Number,
        required: true
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }

})