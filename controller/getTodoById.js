const Todo = require('../models/Todo')


exports.getTodoById = async(request,response)=>{

    try{
        const {id} = request.params;
        const res = await Todo.findById({_id:id})

        if(!res){
            response.status(404).json({
                success:false,
                message:"Data not found by given id"
            })
        }
        response.status(200).json({
            success:true,
            data:res,
            message:`Data found by id ${id}`
        })
    }catch(e){
        console.log(e)
        response.status(500).json({
            message:"Internal Server Error"
        })
    }
}