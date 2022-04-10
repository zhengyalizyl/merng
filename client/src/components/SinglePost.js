import { useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { GET_POST_QUERY } from '../query';
import { Grid, Image, Card } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";
import { AuthContext } from "../context/auth";
import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";

export default function SinglePost() {
    const  {postId}=useParams();
    const   navigate=useNavigate() 
    const {user}=useContext(AuthContext)
    const {data,loading,error} =useQuery(GET_POST_QUERY,{
        variables:{
            postId
        }
    })
    if(loading){
        return <p>loading post......</p>
    }
    const { getPost } = data;

    const { id, likes, likeCount, username, body, createdAt,commentCount,comments } = getPost; 

    const deletButtonCallback=()=>{
         navigate('/')
    }
    console.log(user,username)
  return (
    <Grid>
    <Grid.Row>
      <Grid.Column width={2}>
        <Image
          size="small"
          float="right"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>
          <hr />
          <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <CommentButton post={{id,commentCount}}/>
            {user && user.username === username && (
          <DeleteButton postId={id} callback={()=>deletButtonCallback()}/>
        )}
          </Card.Content>
        </Card>
        {
            comments.map(comment=>(
                <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))
        }
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}
