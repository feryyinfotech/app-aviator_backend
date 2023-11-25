const Todo = require("../models/Todo")

exports.deleteTodo = async(request,response)=>{

    try{
        const {id} = request.params;
        const res = await Todo.findByIdAndDelete({_id:id})
        if(!res){
            response.status(404).json({
                status_code:404,
                message:"Data not by given id"
            })
        }
        response.status(200).json({
            status_code:200,
            message:"Data delete successfully",
            data:res
        })

    }catch(e){
        console.log(e)
        response.status(500).json({
            message:"Internal Server Error",
            status_code:500
        })
    }
}