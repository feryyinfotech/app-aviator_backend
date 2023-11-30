
const Test = require('../../models/Test/Test')
const Varient = require('../../models/Test/Varients')


exports.addTestData = async(req,res)=>{
    try{
        const {name,v_name} = req.body;
        const test = new Test({
            name:name
        })
        const save_varients = new Varient({
            name:v_name
        })
        const savedData = await test.save()
        const saveVarientsData = await save_varients.save();


        const updatedVarients  =  await Varient.findOneAndUpdate({_id:saveVarientsData._id},{$push:{test:savedData._id}},{new:true}).exec();
        const updateTest = await Test.findOneAndUpdate({_id:savedData._id},{$push:{varients:saveVarientsData._id}},{new:true}).exec();

        res.status(200).json({
            success:false,
            message:"Data saved successfully",
            data:updateTest,
            VarientsData : updatedVarients,
        })


       
    }catch(e){
        console.log(e)
    }
}