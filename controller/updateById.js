const Todo = require('../models/Todo')

exports.updateById = async(request,response)=>{

    try{
        const {id} = request.params
        const {title} = request.body


        const res = await Todo.findByIdAndUpdate({ _id:id},{
            title:title,
        })

        // const updateDummy = await Dummy.
        if(!res){
            response.staus(404).json({
                message:"Data not found"
            })
        }

        response.status(200).json({
            message:"Data update Successfully",
            response_code:200,
            data:res
        })
    }catch(e){
        response.staus(500).json({
            message:"Internal Server Error",
            response_code:500
        })
    }
}