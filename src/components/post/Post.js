import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'

// FIXME:
// Being too specific with px styles
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
  &:hover {
    cursor: pointer
  }
`;

const PostTitle = styled.h3`
  margin: 5px 0 5px 0;
  font-size: 1.25rem;
`;

const PostBody = styled.p`
  max-height: 140px;
  overflow: hidden;
  font-size: 0.85rem;
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

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    function flatComments(comments) {
      let result = [];
      comments.forEach((comment) => {
        result.push(comment);
        if (Array.isArray(comment.comments)) {
          result = result.concat(flatComments(comment.comments));
        }
      });
      return result;
    };
    const count = flatComments(data.comments).length;
    setCommentCount(count);
  }, [data.comments]);


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
            Posted by <FakeLink>{data.author}</FakeLink> {data.time} to <Link to={`/m/${data.board}`}>{data.board}</Link>
          </Info>
        </InfoContainer>
        <PostContentContainer className="PostContentContainer" onClick={handlePostClick}>
            <PostTitle >{data.title}</PostTitle>
            <PostBody className="PostBody">
              {data.content}
            </PostBody>
            <CommentCount className="CommentCount" onClick={handlePostClick}>{
              commentCount === 0
              ? "No comments"
              : commentCount === 1
                ? "1 comment"
                : `${commentCount} comments`
            }</CommentCount>
        </PostContentContainer>
      </InnerPostContainer>
    </PostContainer>
  );
};

export default Post;