
const Test = require('../../models/Test/Test')

exports.getTestData = async(req,res)=>{

    try{
        const resp = await Test.find().populate("varients").exec()

        res.status(200).json({
            message:"Data fetch successfully",
            data:resp
        })

    }catch(e){
        console.log("Something went wrong")
    }
}