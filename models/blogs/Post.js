
const mongoose = require("mongoose")

const postModel = new mongoose.Schema({
    title:{
        type:String,
        maxLength:500,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
})

module.exports = mongoose.model("Post",postModel)