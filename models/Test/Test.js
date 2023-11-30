
const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:20,
        required:true
    },
    varients:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Varient"
    }
    ],
    createdAt:{
        type:Date,
        defaultValue:Date.now()
    }
})

module.exports = mongoose.model("Test",testSchema)