import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Icon, Confirm } from "semantic-ui-react";
import { DELETE_POST, GET_POSTS_QUERY, DELETE_COMMENT } from '../query';
import MyPopup from '../utils/MyPopup';

export default function DeleteButton({ postId, callback, commentId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
    let variablesData = {
        postId
    }
    if (commentId) {
        variablesData = {
            postId,
            commentId
        }
    }
    const [deletePostMutation] = useMutation(mutation, {
        variables: variablesData,
        update(proxy) {
            setConfirmOpen(false)
            if (!commentId) {
                const data = proxy.readQuery({ query: GET_POSTS_QUERY });
                const posts = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({
                    query: GET_POSTS_QUERY,
                    data: {
                        ...data,
                        getPosts: {
                            ...posts
                        }
                    }
                })
                callback && callback()
            }
        }
    })
    return (
        <>
            <MyPopup content={commentId?"delete coment button":"delete post"}>
                <Button onClick={() => setConfirmOpen(true)} as="div" color="red" floated="right">
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => deletePostMutation()}
            >
            </Confirm>

        </>
    )
}
