const commentResolvers = require('./comments');
const postResolvers = require('./posts');
const userResolvers = require('./users');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}