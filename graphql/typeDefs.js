const {gql} =require('apollo-server')


 const typeDefs = gql`
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Likes{
    id: ID!
    username: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments:[Comment]!
    likes:[Likes]
  }

  type Query {
    getPosts: [Post],
    getPost:Post
  }

  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput{
      username:String!
      password:String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    # User是返回的类型
    login(loginInput:LoginInput):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:ID!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId: ID!): Post!
  }
`;


module.exports=typeDefs