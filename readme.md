server document:https://www.apollographql.com/docs/apollo-server/getting-started

client document:https://www.apollographql.com/docs/react/data/queries


1.
 query getpost{
  getPosts{
    username
  }
}

2.
mutation {
   register(registerInput:{
    username:"zyl",
    email:"863344241@qq.com",
    password:"123",
    confirmPassword:"123"
  }){
    id
    email
    username
    token
  }
}