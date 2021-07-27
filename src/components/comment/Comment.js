import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 97%;
  max-width: 955.6px;
  border-top: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  border-bottom: 5px solid #ffffff;
  background-color: #ffffff;
  border-top-left-radius: ${props => props.index === 0 ? "5px" : "0"};
  border-top-right-radius: ${props => props.index === 0 ? "5px" : "0"};
  border-bottom-right-radius: ${props => props.index === props.length ? "5px" : "0"};
  border-bottom-right-radius: ${props => props.index === props.length ? "5px" : "0"};
`;

const InnerCommentContainer = styled.div`
  background-color: #c6e8fc;
  width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 3px solid #c6e8fc;
  padding: 10px 10px 10px 10px;
  &:hover {
    cursor: pointer;
    border: 3px solid #c4c4c4;
  }
`;

const CommentInfo = styled.p`
  font-size: 0.75rem;
  margin-bottom: 5px;
`;
const CommentBody = styled.p`
  font-size: 0.85rem;
`;

function Comment(props) {
  const { data, index, length } = props;
  let history = useHistory();

  const handleClick = () => {
    history.push(`/p/${data.parentPostId}`);
  }

  return (
    <CommentContainer className="CommentContainer" index={index} length={length}>
      <InnerCommentContainer className="InnerCommentContainer" onClick={handleClick}>
        <CommentInfo>{data.author} | {data.votes} votes | {data.time}</CommentInfo>
        <CommentBody>{data.comment}</CommentBody>
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default Comment;