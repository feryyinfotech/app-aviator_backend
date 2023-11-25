
const Customer = require('../../models/tableWithPagination/Customer')

exports.createCustomer = async(request,response)=>{
    try{

        const {name,age,status} = request.body
        const customer = new Customer({
            name:name,
            age:age,
            staus:status
        })

        const res = await customer.save()

        response.status(200).json({
            status:true,
            message:"Data saved Successfully",
            data:res
        })
    }catch(e){
        console.log(e)
        response.status(500).json({
            message:false,
            message:"Something went wrong from backend side"
        })
    }
}