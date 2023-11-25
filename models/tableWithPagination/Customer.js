const mongoose = require('mongoose')

const customerModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    staus:{
        type:String,
        default:"pending",
    }
})

module.exports = mongoose.model("Customer",customerModel)