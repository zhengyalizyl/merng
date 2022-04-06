const Post=require('../../model/Post');

module.exports = {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find();
          return posts;
        } catch (err) {
          throw new Error(err);
        }
      },
      async getPost(parent,{postId}){
        try {
            const post = await Post.findById(postId);
            if(post){
                return post;
            }else{
                throw new Error('post未找到')
            }
          } catch (err) {
            throw new Error(err);
          }
      }
    },
    Mutation:{
        async createPost(parent,args,context){
            const {body}=args;
            const {req} =context;
            console.log(req,req.headers,"=====")
            return 
        }
    }
  };
