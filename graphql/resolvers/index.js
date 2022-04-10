const commentResolvers = require('./comments');
const postResolvers = require('./posts');
const userResolvers = require('./users');

module.exports = {
    Post:{
        likeCount:parent=>parent.likes.length,
        commentCount:parent=>parent.comments.length
    },
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}