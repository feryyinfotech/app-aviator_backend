const Customer = require('../../models/tableWithPagination/Customer')

exports.changeStaus = async(request,response)=>{
    try{
        const {c_id,status} = request.body

        console.log(c_id,status)
        const res = await Customer.findByIdAndUpdate({_id:c_id},{staus:status})

        response.status(200).json({
            dat:res,
            response_code:200,
            message:"Status Changed Successfully"
        })
    }catch(e){
        response.status(500).json({
            message:"something went wrong with 500"
        })
    }
}