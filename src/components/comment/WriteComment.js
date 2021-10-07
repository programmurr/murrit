import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import useUser from '../../hooks/useUser';
import {
  addComment,
  updateUserCommentDoc,
  updatePostComments,
  updateCommentChildren
} from '../../firebase';


const CommentFormContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
`;
const CommentForm = styled.form`
  width: 75%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const CommentLabel = styled.label``;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 15vh;
  min-height: 120px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 5px;
  font-family: Arial, sans serif;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div``;

const CommentSubmitButton = styled.button`
  background-color: #008cff;
  color: #ffffff;
  padding: 0.3rem;
  border-radius: 15px;
  font-weight: 600;
  &:hover {
    background-color: #0099ff;
    cursor: pointer;
  }
`;

function WriteComment(props) {
  const { parentId, parentPostId, isReply } = props;
  const user = useUser();

  const [commentText, setCommentText] = useState("");

  const handleChange = (event) => {
    setCommentText(event.target.value);
  }

  const constructComment = (id, parentId, parentPostId, userId, commentText) => {
    return {
      id: id,
      parentId: parentId,
      parentPostId: parentPostId,
      author: userId,
      comment: commentText,
      time: Date.now(),
      votes: 1,
      comments: []
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = `com_${uuidv4()}`;
    const comment = constructComment(id, parentId, parentPostId, user.id, commentText);
    if (isReply) {
      addComment(comment)
        .then(() => {
          updateUserCommentDoc(user.uid, id)
            .then(() => {
              updateCommentChildren(parentId, id)
                .then(() => {
                  setCommentText("");
                  props.refreshComments();
                })
            })
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      addComment(comment)
      .then(() => {
        updateUserCommentDoc(user.uid, id)
          .then(() => {
            updatePostComments(parentId, id)
              .then(() => {
                setCommentText("");
                props.refreshComments();
                // https://www.youtube.com/watch?v=oqwzuiSy9y0    
              });
          });
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  return (
    <CommentFormContainer className="CommentFormContainer">
      <CommentForm className="CommentForm">
        <CommentLabel className="CommentLabel" >Comment on this post here:</CommentLabel>
        <CommentTextArea value={commentText} onChange={handleChange} className="CommentTextArea"/>
        <ButtonContainer className="ButtonContainer">
          <CommentSubmitButton onClick={handleSubmit}>Submit Comment</CommentSubmitButton>
        </ButtonContainer>
      </CommentForm>
    </CommentFormContainer>
  );
}

export default WriteComment;