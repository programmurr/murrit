import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 97%;
  max-width: 955.6px;
  border-top: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  border-bottom: 5px solid #ffffff;
  background-color: #ffffff;
`;

const InnerCommentContainer = styled.div`
  background-color: #c6e8fc;
  width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 3px solid #c6e8fc;
  padding: 10px 10px 10px 10px;
`;

const CommentInfo = styled.p`
  font-size: 0.75rem;
  margin-bottom: 5px;
`;
const CommentBody = styled.p`
  font-size: 0.85rem;
`;

// TODO: Recursively print nested comments
function PostComment(props) {
  const { data } = props;

  return (
    <CommentContainer className="CommentContainer">
      <InnerCommentContainer className="InnerCommentContainer">
        <CommentInfo>
          <Link to={`/u/${data.author}`}>{data.author}</Link> | {data.votes} votes | {data.time}
        </CommentInfo>
        <CommentBody>{data.comment}</CommentBody>
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default PostComment;