import React from 'react';
import styled from 'styled-components';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'

const PostContainer = styled.div`
  display: flex;
  width: 97%;
  max-height: 200px;
  margin-top: 5px;
  margin-bottom: 20px;
  border-top: 5px solid white;
  border-right: 5px solid white;
  border-bottom: 5px solid white;
  border-radius: 10px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid white;
  width: 40px;
  background-color: #fafafa;
`;

const UpvoteIcon = styled.img`
  width: 10px;
  margin-bottom: 2px;
  &:hover {
    cursor: pointer;
    position: relative;
    top: -2px;
  }
`;

const DownvoteIcon = styled(UpvoteIcon)`
  margin-bottom: 0;
  margin-top: 2px;
  &:hover {
    top: 2px;
  }
`;

const VoteCount = styled.p`
  width: 100%;
  text-align: center;
  font-weight: 400;
`;

const InnerPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Info = styled.p`
  font-size: 0.75rem;
`;

const PostContentContainer = styled.div`
  height: 100%;
  position: relative;
`;

const PostTitle = styled.h3`
  margin: 5px 0 5px 0;
  font-size: 1.25rem;
  &:hover {
    cursor: pointer;
  }
`;

const PostBody = styled.p`
  max-height: 140px;
  overflow: hidden;
`;

// TODO:
// Fix opacity on bottom of body
const CommentCount = styled.p`
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding-top: 30px;
  background-image: linear-gradient(to bottom, transparent, white);
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

  const handleUpvote = () => {
    // Handle upvote
  }

  const handleDownvote = () => {
    // Handle downvote
  }

  return (
    <PostContainer className="PostContainer">
      <VoteContainer className="VoteContainer">
        <UpvoteIcon src={UpIcon} onClick={handleUpvote}/>
        <VoteCount>{data.votes}</VoteCount>
        <DownvoteIcon src={DownIcon} onClick={handleDownvote}/>
      </VoteContainer>
      <InnerPostContainer className="InnerPostContainer">
        <InfoContainer className="InfoContainer">
          <Info>
            Posted by <FakeLink>{data.author}</FakeLink> {data.time} to <FakeLink>{data.board}</FakeLink>
          </Info>
        </InfoContainer>
        <PostContentContainer className="PostContentContainer" onClick={handlePostClick}>
            <PostTitle >{data.title}</PostTitle>
            <PostBody className="PostBody">
              {data.content}
            </PostBody>
            <CommentCount onClick={handlePostClick}>{
              data.comments.length === 0
              ? "No comments"
              : data.comments.length === 1
                ? "1 comment"
                : `${data.comments.length} comments`
            }</CommentCount>
        </PostContentContainer>
      </InnerPostContainer>
    </PostContainer>
  );
};

export default Post;