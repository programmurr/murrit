import React, { useState } from 'react';
import styled from 'styled-components';

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
  border-radius: 10px;
  padding: 5px;
  font-family: Arial, sans serif;
`;

const ButtonContainer = styled.div``;

const CommentSubmitButton = styled.button``;

function WriteComment(props) {
  const { postId } = props;

  const [commentText, setCommentText] = useState("");

  const handleChange = (event) => {
    setCommentText(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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