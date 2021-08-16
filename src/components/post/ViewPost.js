import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'
import testPostData from '../../utils/posts';
import PostComment from './PostComment';
import SortBox from '../sort/SortBox';

const PostPage = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: 8vh;
`;
const PostContainer = styled.div`
  display: flex;
  width: 97%;
  max-width: 955.6px;
  margin-top: 15px;
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
`;

const PostBody = styled.p`
  overflow: hidden;
  font-size: 1rem;
`;

const CommentCount = styled.p`
  font-size: 0.75rem;
  width: 100%;
  margin: 0;
`;

const CommentWall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 97%;
  max-width: 955.6px; 
  border: ${props => props.commentCount === 0 ? "none" : "2px solid #c4c4c4"};
  border-radius: 5px;
  background-color: ${props => props.commentCount === 0 ? "#dae0e6" : "c6e8fc"};
`;


function ViewPost() {
  let { postid } = useParams();

  const [data] = useState(testPostData);
  const [livePost, setLivePost] = useState();
  useEffect(() => {
    const livePost = data.filter((post) => post.postId === postid)[0];
    setLivePost(livePost);
  }, [data, postid]);

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (livePost !== undefined) {
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
      const count = flatComments(livePost.comments).length;
      setCommentCount(count);
    }
  }, [livePost]);

  const handleUpvote = () => {
    // handle Upvote
  }

  const handleDownvote = () => {
    // handle Downvote
  }

  if (livePost !== undefined) {
    return (
      <PostPage className="PostPage">
        <PostContainer className="PostContainer">
          <VoteContainer className="VoteContainer">
            <UpvoteIcon src={UpIcon} onClick={handleUpvote}/>
            <VoteCount>{livePost.votes}</VoteCount>
            <DownvoteIcon src={DownIcon} onClick={handleDownvote}/>
          </VoteContainer>
          <InnerPostContainer className="InnerPostContainer">
          <InfoContainer className="InfoContainer">
            <Info>
              Posted by <Link to={`/u/${livePost.author}`}>{livePost.author}</Link> {livePost.time} to <Link to={`/m/${livePost.board}`}>{livePost.board}</Link>
            </Info>
          </InfoContainer>
          <PostContentContainer className="PostContentContainer">
              <PostTitle >{livePost.title}</PostTitle>
              <PostBody className="PostBody">
                {livePost.content}
              </PostBody>
              <CommentCount className="CommentCount">{
                commentCount === 0
                ? "No comments"
                : commentCount === 1
                  ? "1 comment"
                  : `${commentCount} comments`
              }</CommentCount>
          </PostContentContainer>
          </InnerPostContainer>
        </PostContainer>
        <SortBox />
        <CommentWall className="CommentWall" commentCount={commentCount}>
          {
            commentCount > 0
            ? livePost.comments.map((comment, index) => (
              <PostComment key={comment.author + index} data={comment} isReply={false}/>
            ))
            : <div>
                Be the first to comment by logging in or signing up!
              </div>
          }
        </CommentWall>
      </PostPage>
    );
  } else {
    return <div>Post not found</div>
  }
  
}

export default ViewPost;