import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState ,useRef} from 'react'
import { useParams } from "react-router-dom";
import { CREATE_COMMENT, GET_POST_QUERY } from '../query';
import { Grid, Image, Card,Form } from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import moment from "moment";
import { AuthContext } from "../context/auth";
import CommentButton from "../components/CommentButton";
import DeleteButton from "../components/DeleteButton";
import { useNavigate } from "react-router-dom";

export default function SinglePost() {
    const  {postId}=useParams();
    const   navigate=useNavigate() ;
    const [comment,setComment]=useState('');
    const commentInputRef = useRef(null);
    const {user}=useContext(AuthContext)
    const {data,loading,error} =useQuery(GET_POST_QUERY,{
        variables:{
            postId
        }
    })
    const [createCommentMutation]=useMutation(CREATE_COMMENT,{
      variables:{
        postId,
        body:comment
      },update(){
        setComment('');
        commentInputRef.current.blur();
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
   
    const submitComment=()=>{
      createCommentMutation()
    }
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
        {user&&(
          <Card fluid>
          <Card.Content>
            <p>Post a comment</p>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment..."
                  name="comment"
                  value={comment}
                  ref={commentInputRef}
                  onChange={event => setComment(event.target.value)}
                />
                <button
                  disabled={comment.trim() === ""}
                  type="submit"
                  className="ui button teal"
                  onClick={submitComment}
                >
                  Submit
                </button>
              </div>
            </Form>
          </Card.Content>
        </Card>
        )}
        {
            comments.map(comment=>(
                <Card fluid key={comment.id}>
                <Card.Content>
                    {user&&user.username===username&&(
                        <DeleteButton postId={id}  commentId={comment.id}/>
                    )}
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
