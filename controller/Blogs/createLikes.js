const Like = require('../../models/blogs/Likes')
const Post = require('../../models/blogs/Post')

exports.createLikes = async(request,response)=>{

    try{
       const {post,user} = request.body
       const like = new Like({post:post,user:user})
       const res = await like.save()
       const post_res = await Post.findByIdAndUpdate(post,{$push:{like:res._id}},{new:true})

       response.status(200).json({
        success:true,
        like_message:res,
        post_message:post_res,
        message:"Data saved successfully"
       })
    }catch(e){
        console.log(e)
        response.status(500).json({
            message:"Something went wrong from backend side",
            status:false
        })
    }
}