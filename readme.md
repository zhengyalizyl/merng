server document:https://www.apollographql.com/docs/apollo-server/getting-started
https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/

client document:https://www.apollographql.com/docs/react/data/queries
https://www.apollographql.com/docs/react/api/apollo-client/

https://www.apollographql.com/docs/react/data/fragments/

https://react.semantic-ui.com/usage/

semantic-ui-css的webpack问题：https://github.com/Semantic-Org/Semantic-UI-CSS/issues/81

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

3.mutation {
   login(loginInput:{
    username:"yw",
    password:"123",
  }){
    email
    username
    token
    id
  }
}