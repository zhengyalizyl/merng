import React, { useEffect, useState } from 'react'
import { useMutation} from '@apollo/client';
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { LIKE_POST_MUTATION } from '../query';

export default function LikeButton(props) {
const {id,likes,likeCount}=props.post;
const {user} =props;
const [liked,setLiked]=useState(false);
const [likePostMutation]=useMutation(LIKE_POST_MUTATION,{
    variables:{
        postId:id
    }
})
useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
    setLiked(false)
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={()=>likePostMutation()}>
    {likeButton}
    <Label basic color="teal" pointing="left">
      {likeCount}
    </Label>
  </Button>
  )
}
