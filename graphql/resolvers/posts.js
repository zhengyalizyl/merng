const { AuthenticationError } = require('apollo-server');
const Post = require('../../model/Post');
const {checkAuth}=require('../../utils/check-auth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().createdAt(-1);
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(parent, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('post未找到')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(parent, args, context) {
            const { body } = args;
            // console.log(req, req.headers, "=====")
            const user=checkAuth(context);
            const newPost=new Post({
                body,
                username:user.username,
                createdAt:new Date().toISOString(),
                user:user.id
            })
            const post=await newPost.save();
            return post
        },
        async deletePost(parent,args,context){
            const { postId } = args;
            const user=checkAuth(context);
            try {
                const post=await Post.findById(postId);
                if(user.username===post.username){
                    await post.delete();
                    return "Post delete suceessfully"
                }
               throw new AuthenticationError('操作不被允许')
            } catch (error) {
                throw new Error(err)
            }
        }
    }
};



