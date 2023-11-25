
const Post = require("../../models/blogs/Post")

exports.createPost = async(request,response)=>{

    try{
        const {title,body} = request.body

        const post = new Post({title:title,body:body})
        const res = await post.save()
        if(!res){
            response.status(404).json({
                status:false,
                message:"Something went wrong"
            })
        }
        response.status(200).json({
            success:true,
            message:res,
        })
    }catch(e){
        response.status(500).json({
            success:false,
            data:"No data found",
            message:"Internal Server Error"
        })
    }
}