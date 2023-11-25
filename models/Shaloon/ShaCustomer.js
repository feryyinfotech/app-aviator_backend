const mongoose  = require('mongoose')

const customer = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        rquired:true,
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String
    }
})
module.exports = mongoose.model("ShaCustomer",customer)
