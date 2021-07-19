import React from 'react';
import styled from 'styled-components';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'

const PostContainer = styled.div`
  display: flex;
  width: 97%;
  border: 1px solid black;
  margin-top: 5px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  width: 15px;
`;

const UpvoteIcon = styled.img`
  width: 10px;
`;

const DownvoteIcon = styled(UpvoteIcon)``;

const VoteCount = styled.p``;

const InnerPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Info = styled.p`
  font-size: 0.75rem;
`;

const PostTitleContainer = styled.div``;

const PostTitle = styled.h3`
  margin-top: 2px;
  font-size: 1.25rem;
  &:hover {
    cursor: pointer;
  }
`;

const CommentCountContainer = styled.div``;

const CommentCount = styled.p`
  margin-top: 2px;
  font-size: 0.75rem;
  &:hover {
    cursor: pointer;
  }
`;

const FakeLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
`;

function Post(props) {
  const { data } = props;

  const handlePostClick = () => {
    // Go to the post
  }

  return (
    <PostContainer className="PostContainer">
      <VoteContainer className="VoteContainer">
        <UpvoteIcon src={UpIcon}/>
        <VoteCount>{data.votes}</VoteCount>
        <DownvoteIcon src={DownIcon}/>
      </VoteContainer>
      <InnerPostContainer className="InnerPostContainer">
        <InfoContainer className="InfoContainer">
          <Info>
            Posted by <FakeLink>{data.author}</FakeLink> {data.time} to <FakeLink>{data.board}</FakeLink>
          </Info>
        </InfoContainer>
        <PostTitleContainer className="PostTitleContainer">
          <PostTitle onClick={handlePostClick}>{data.title}</PostTitle>
        </PostTitleContainer>
        <CommentCountContainer className="CommentCountContainer">
          <CommentCount onClick={handlePostClick}>{
            data.comments.length === 0
            ? "No comments"
            : `${data.comments.length} comments`
          }</CommentCount>
        </CommentCountContainer>
      </InnerPostContainer>
    </PostContainer>
  );
};

export default Post;