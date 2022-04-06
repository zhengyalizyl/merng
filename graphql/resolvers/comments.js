const { UserInputError,AuthenticationError } = require('apollo-server');
const Post = require('../../model/Post');
const {checkAuth}=require('../../utils/check-auth')

module.exports = {
    Mutation: {
        async createComment(parent, args, context) {
            const { body,postId } = args;
            const user=checkAuth(context);
            if(body.trim()===""){
                throw new UserInputError("Empty comment", {
                    errors: {
                      body: "Comment body must not empty"
                    }
                  });
            }
            try {
                const post=await Post.findById(postId);
                if(post){
                    post.comments.unshift({
                        body,
                        username:user.username,
                        createdAt:new Date().toISOString()
                    })
                }
               await post.save();
               return post;
            } catch (error) {
                throw new UserInputError('post未找到')
            }
        },
        async deleteComment(parent,args,context){
            const { postId,commentId } = args;
            const user=checkAuth(context);
            try {
                const post=await Post.findById(postId);
                if(post){
                    const commentIndex=post.comments.findIndex(c=>c.id===commentId);
                    if(post.comments[commentIndex].username===user.username){
                        post.comments.splice(commentIndex,1)
                        await post.save();
                        return post
                    }else{
                        throw new AuthenticationError("Action not allowed"); 
                    }
                }else{
                    throw new UserInputError('post未找到')
                }
              
            } catch (error) {
                throw new Error(err)
            }
        }
    }
};



