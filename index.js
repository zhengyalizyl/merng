const { ApolloServer, gql } = require('apollo-server');
const mongoose = require("mongoose");
const Post = require('./model/Post');
const  typeDefs  =require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
       req
      })
})

mongoose
    .connect(MONGODB)
    .then(() => {
        console.log("merng database connect")
        return server.listen({ port: 5001 })
    }).then(res => {
        console.log(`Server running at ${res.url}`);
    });
