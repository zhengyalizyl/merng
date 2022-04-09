import { gql } from "@apollo/client";

export const GET_POSTS_QUERY = gql`
     query getPostsQuery {
        getPosts{
                  id
                  body
                  createdAt
                  username
                  likeCount
                  likes{
                    username  
                  }
                  commentCount
                 comments{
                     id
                     username
                     createdAt
                     body
                 }
              }
      }
`;

export const REGISTER = gql`
      mutation register($registerInput: RegisterInput){
        register(registerInput:$registerInput){
          id
         email
         username
         createdAt
         token
        }
      }

`


export const LOGIN = gql`
    mutation login($loginInput:LoginInput){
    login(loginInput:$loginInput) {
      id
      email
      username
      createdAt
      token
    }
}
`