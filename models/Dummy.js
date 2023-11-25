const mongoose = require('mongoose')

const DummySchema = new mongoose.Schema({
    todo_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }],
    d_title:{
        type:String,
        maxLenght:500,
    }
})

module.exports = mongoose.model("Dummy",DummySchema)