import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_POSTS_QUERY } from '../query';
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

export default function Home() {

  const {data,loading,error}=useQuery(GET_POSTS_QUERY);
    
    

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  )
}
