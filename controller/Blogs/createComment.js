const Comment = require('../../models/blogs/Comments')
const Post = require('../../models/blogs/Post')

exports.createComments = async(request,response)=>{
    try{
        const {post,user,body} = request.body
        const comment  = new Comment({
            post:post,
            user:user,
            body:body
        })

        const comment_res = await comment.save()
        const post_res = await Post.findByIdAndUpdate({_id:post},{$push:{comment:comment_res._id}},{new:true})
        .populate("comment").exec()
        response.status(200).json({
            message:true,
            comment_data:comment_res,
            post_res:post_res,
            message:"Data save successfull"
        })
    }catch(e){
        console.log(e)
        response.status(500).json({
            success:false,
            message:"Something went wrong from backend side"
        })
    }
}