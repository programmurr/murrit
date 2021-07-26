import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #c6e8fc;
  width: 100%;
  min-width: 300px;
`;

const ThreadContainer = styled.div`
  display: ${props => props.isReply ? "flex": "none"};
  width: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CommentThread = styled.div`
  width: 4px;
  background-color: rgba(0,0,0,0.3);
  height: calc(100% - 5px);
  &:hover {
    background-color: rgba(0,0,0,0.5);
  }
`;

const InnerCommentContainer = styled.div`
  background-color: #c6e8fc;
  display: flex;
  flex-direction: column;
  width: 97%;
  padding: 5px 5px 0 5px;
`;

const CommentInfo = styled.p`
  font-size: 0.75rem;
  display: flex;
`;
const CommentBody = styled.p`
  font-size: 0.85rem;
  padding-top: 2px;
`;

function PostComment(props) {
  const { data, isReply } = props;

  return (
    <CommentContainer className="CommentContainer">
      <ThreadContainer className="ThreadContainer" isReply={isReply}>
        <CommentThread className="CommentThread" />
      </ThreadContainer>
      <InnerCommentContainer className="InnerCommentContainer">
        <CommentInfo className="CommentInfo">
          <Link to={`/u/${data.author}`}>{data.author}</Link> | {data.votes} votes | {data.time}
        </CommentInfo>
        <CommentBody className="CommentBody">{data.comment}</CommentBody>
        {
          data.comments.length > 0
          ? data.comments.map((comment, index) => (
            <PostComment key={comment.author + index} data={comment} isReply={true}/>
          ))
          : <div className="BlanketyBlank"/>
        }
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default PostComment;