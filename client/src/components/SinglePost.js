import { useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { GET_POST_QUERY } from '../query';
import { Grid, Image, Card } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";
import { AuthContext } from "../context/auth";

export default function SinglePost() {
    const  {postId}=useParams();
    const user=useContext(AuthContext)
    const {data,loading,error} =useQuery(GET_POST_QUERY,{
        variables:{
            postId
        }
    })
    if(loading){
        return <p>loading post......</p>
    }
    const { getPost } = data;

    const { id, likes, likeCount, username, body, createdAt } = getPost; 
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
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}
