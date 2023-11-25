
const Dummy = require('../models/Dummy');
const Todo = require('../models/Todo')

exports.createTodo = async(req,resonse)=>{
    try{
        const {title,description,id} = req.body;

        const res = await Todo.create({title,description});

        const dummy_res = await Dummy.findByIdAndUpdate({_id:id},{d_title:title,$push:{todo_id:res._id}},{new:true})
        .populate("todo_id").exec()

        resonse.status(200).json({
            success:true,
            data:res,
            dummy_data:dummy_res,
            message:"data get Successfully"
        })
    }catch(e){
        // res.status(500)
        // .json({
        //     success:false,
        //     data:"Internal server error"
        // })
        console.log("This is controller error",e)
    }
}

