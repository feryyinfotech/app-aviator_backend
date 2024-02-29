const con = require('../../config/database')

exports.aviatortest = async(req,res)=>{
  try{
    con.query('select * from user',(err,result)=>{
      console.log(result,"result")
        if(result)
        return res.status(200).json({
         data:result,
         msg:"Data get successfully"
        })
        return res.status(400).json({
            msg:"Error in data fetching"
        })
    })   
  }catch(e){
    console.log(e)
    return res.status(500).json({
        msg:"Error in data fetching"
    })
  }
}