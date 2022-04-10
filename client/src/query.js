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


export const CREATE_POST=gql`
  mutation createPost($body:String!){
    createPost(body:$body){
      id
      body
      createdAt
      username
      comments{
        id
        username
        createdAt
        body
      }
      likes{
        username
      }
      commentCount
      likeCount
    }
  }
`

export const LIKE_POST_MUTATION=gql`
  mutation likePost($postId:ID!){
    likePost(postId:$postId){
      id
      body
      createdAt
      username
      comments{
        id
        username
        createdAt
        body
      }
      likes{
        username
      }
      commentCount
      likeCount
    }
  }

`


export const GET_POST_QUERY=gql`
  query getPost($postId:ID!){
    getPost(postId:$postId){
      id
      body
      createdAt
      username
      comments{
        id
        username
        createdAt
        body
      }
      likes{
        username
      }
      commentCount
      likeCount
    }
  }
`