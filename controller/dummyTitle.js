const Dummy = require('../models/Dummy')


exports.createDummyTitle = async(request,response)=>{
    try{
        const {d_title} = request.body
        const res = await Dummy.create({d_title:d_title})

        response.status(200).json({
            message:"Data poset Successfully",
            response_code:200,
            data:res
        })
    }catch(e){
        response.status(500).json({
            message:"Internal Server Error"
        })
    }
}