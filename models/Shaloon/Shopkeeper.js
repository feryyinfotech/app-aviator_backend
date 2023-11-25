const mongoose  = require('mongoose')

const createShopKeeper = new mongoose.Schema({
    f_name:{
        type:String,
        required:true,
    },
    l_name:{
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
    shop_name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true
    },
    basic_cost:{
        type:Number,
        required:true
    },
    account_number:{
        type:String,
    },
    email:{
        type:String,
    },
    latitude:{
        type:String,
    },
    longitude:{
        type:String
    }
})

module.exports = mongoose.model("Shop",createShopKeeper)


