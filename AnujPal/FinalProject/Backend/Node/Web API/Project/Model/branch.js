const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchCode: {
        type: Number,
        required: true,
        unique: true
    },
    branchName:{
        type:String,
        required:true,
    },
    city:{
        type:string,
        required:true
    }

})