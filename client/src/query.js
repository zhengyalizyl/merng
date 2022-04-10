import { gql } from "@apollo/client";



export const POST_FRAGEMENT=gql`
   fragment PostFragement on Post{
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

 `

export const GET_POSTS_QUERY = gql`
     query getPostsQuery {
        getPosts{
                ...PostFragement
              }
      }
      ${POST_FRAGEMENT}
`;

export const  USER_FRAGMENT=gql`
   fragment userFragment on User{
        id
         email
         username
         createdAt
         token
   }

`

export const REGISTER = gql`
      mutation register($registerInput: RegisterInput){
        register(registerInput:$registerInput){
           ...userFragment
        }
      }
  ${USER_FRAGMENT}
`


export const LOGIN = gql`
    mutation login($loginInput:LoginInput){
    login(loginInput:$loginInput) {
      ...userFragment
    }
}
${USER_FRAGMENT}
`


export const CREATE_POST=gql`
  mutation createPost($body:String!){
    createPost(body:$body){
       ...PostFragement
    }
  }
  ${POST_FRAGEMENT}
`

export const LIKE_POST_MUTATION=gql`
  mutation likePost($postId:ID!){
    likePost(postId:$postId){
        ...PostFragement
    }
  }
  ${POST_FRAGEMENT}

`


export const GET_POST_QUERY=gql`
  query getPost($postId:ID!){
    getPost(postId:$postId){
      ...PostFragement
    }
  }
  ${POST_FRAGEMENT}
`

export const DELETE_POST=gql`
   mutation deletePost($postId:ID!){
     deletePost(postId:$postId)
   }

`

export const DELETE_COMMENT=gql`
mutation deleteComment($postId:ID!,$commentId:ID!){
  deleteComment(postId:$postId,commentId:$commentId){
    PostFragement
  }
}
${POST_FRAGEMENT}
`





export const CREATE_COMMENT=gql`
    mutation createComment($postId:ID!,$body:String!){
      createComment(postId:$postId,body:$body){
        ...PostFragement
      }
    }
    ${POST_FRAGEMENT}
`