import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hook";
import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS_QUERY } from '../query';


export default function PostForm() {
    const {values,onSubmit,onChange} =useForm(createPost,{
              body:''
    })
    const [createPostMutation,{error}]=useMutation(CREATE_POST,{
        update(proxy,res){
            values.body="";
            const data=proxy.readQuery({query:GET_POSTS_QUERY});
            const   posts=[...data.getPosts,res.data?.createPost];
            proxy.writeQuery({query:GET_POSTS_QUERY,data:{
                ...data,
                getPosts:posts
            }})
            // console.log(data)
        },
             variables:values
    })
    function createPost(){
         createPostMutation()
    }
  return (
      <>
    <Form onSubmit={onSubmit}>
    <h2>Create a post:</h2>
    <Form.Field>
      <Form.Input
        placeholder="Hi World!"
        value={values.body}
        name="body"
        error={error ? true : false}
        onChange={onChange}
      />
      <Button type="submit" color="teal">
        Submit
      </Button>
    </Form.Field>
  </Form>
   {error && (
    <div className="ui error message" style={{ marginBottom: 20 }}>
      <ul className="list">{error.graphQLErrors[0].message}</ul>
    </div>
  )}
  </>
  )
}
