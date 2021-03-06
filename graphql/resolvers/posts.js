const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../model/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt:-1});
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
            const user = checkAuth(context);
            if (body.trim() === "") {
                throw new Error('post的body不能为空')
            }
            const newPost = new Post({
                body,
                username: user.username,
                createdAt: new Date().toISOString(),
                user: user.id
            })
            const post = await newPost.save();
            return post
        },
        async deletePost(parent, args, context) {
            const { postId } = args;
            const user = checkAuth(context);
            console.log(user,postId)
            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return "Post delete suceessfully"
                }
                throw new AuthenticationError('操作不被允许')
            } catch (error) {
                throw new Error(err)
            }
        },
        async likePost(parent, args, context) {
            const { username } = checkAuth(context);
            const { postId } = args
            const post = await Post.findById(postId);

            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();
                return post;
            } else {
                throw new UserInputError("Post not found");
            }
        }
    }
};



