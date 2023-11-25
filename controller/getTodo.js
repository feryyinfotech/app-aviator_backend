const Todo = require('../models/Todo')

exports.getTodo = async(req,response)=>{
    try{
       const res = await Todo.find({});
       console.log(res)
            response.status(200).json({
                data:res,
            message:"Data get succesfully"
            })

    }catch(e){
        response.status(500).json({
            success:false
        })
        console.log(e)
    }
}