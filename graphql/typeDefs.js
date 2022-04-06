const {gql} =require('apollo-server')


 const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
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
  }
`;


module.exports=typeDefs