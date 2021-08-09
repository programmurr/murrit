import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'

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
  width: 3px;
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

const CommentInfo = styled.div`
  height: 1rem;
  font-size: 0.85rem;
`;

const CommentInfoElements = styled.div`
  width: 35%;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeStamp = styled.p``;

const Upvote = styled.img`
  width: 10px;
  margin-right: 3px;
  &:hover {
    cursor: pointer;
    position: relative;
    top: -2px;
    background-color: rgba(156, 255, 147, 0.7);
  }
`;

const Downvote = styled(Upvote)`
  margin-right: 0px;
  margin-left: 3px;
  &:hover {
    top: 2px;
    background-color: rgba(255, 147, 147, 0.3);
  }
`;

const CommentBody = styled.p`
  font-size: 0.9rem;
  padding-top: 2px;
  padding-bottom: 5px;
`;

function PostComment(props) {
  const { data, isReply } = props;

  return (
    <CommentContainer className="CommentContainer">
      <ThreadContainer className="ThreadContainer" isReply={isReply}>
        <CommentThread className="CommentThread" />
      </ThreadContainer>
      <InnerCommentContainer className="InnerCommentContainer">
        <CommentInfo className="CommentInfoContainer">
          <CommentInfoElements className="CommentInfoElements">
            <Link to={`/u/${data.author}`}>{data.author}</Link>
            <VoteContainer>
              <Upvote src={UpIcon} alt="Upvote Icon"/>{data.votes} votes<Downvote src={DownIcon} alt="Downvote Icon"/>
            </VoteContainer> 
            <TimeStamp>
              {data.time}
            </TimeStamp>
          </CommentInfoElements>
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