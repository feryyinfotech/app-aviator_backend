

const mongoose = require('mongoose')

const varientsSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:20,
        required:true,
    },
    test:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Test"
    }]
})

module.exports = mongoose.model("Varient",varientsSchema)