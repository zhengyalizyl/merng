import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { Button, Icon,Confirm  } from "semantic-ui-react";
import { DELETE_POST, GET_POSTS_QUERY } from '../query';

export default function DeleteButton({postId,callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
   const [deletePostMutation]= useMutation(DELETE_POST,{
       variables:{
           postId
       },
       update(proxy){
           const data=proxy.readQuery({query:GET_POSTS_QUERY});
           const posts=data.getPosts.filter(p=>p.id!==postId)
           proxy.writeQuery({
               query:GET_POSTS_QUERY,
               data:{
                   ...data,
                   getPosts:{
                       ...posts
                   }
               }
           })
         callback&&callback()
       }
   })
  return (
      <>
    <Button onClick={()=>setConfirmOpen(true)} as="div" color="red" floated="right">
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
    <Confirm
     open={confirmOpen}
     onCancel={() => setConfirmOpen(false)}
     onConfirm={()=>deletePostMutation()}
    >

    </Confirm>
    </>
  )
}
