import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UpIcon from '../../img/up-arrow.svg';
import DownIcon from '../../img/down-arrow.svg';
import { db } from '../../firebase';

// FIXME:
// Being too specific with px styles
const PostContainer = styled.div`
  display: flex;
  width: 95%;
  max-width: 955.6px;
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
    background-color: green;
  }
`;

const DownvoteIcon = styled(UpvoteIcon)`
  margin-bottom: 0;
  margin-top: 2px;
  &:hover {
    cursor: pointer;
    background-color: red;
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
  max-width: 824px;
  overflow: hidden;
  overflow-wrap: break-word;
  font-size: 0.85rem;
  min-height: 60px;
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

const ImagePostContainer = styled.div``;
const ImageBody = styled.div``;

const ImagePostBody = (data) => {
  return (
    <ImagePostContainer className="ImagePostContainer">
      <ImageBody className="ImageBody">
        {data.content}
      </ImageBody>
    </ImagePostContainer>
  )
}

function Post(props) {
  let history = useHistory();
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

  const [author, setAuthor] = useState("");
  useEffect(() => {
    db.collection("users").doc(data.author).get()
      .then((doc) => {
        if (doc.exists) {
          const user = doc.data();
          setAuthor(user.displayName);
        } else {
          setAuthor("[deleted]");
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }, [data.author])

  const handlePostClick = () => {
    history.push(`/p/${data.postId}`);
  }

  const handleUpvote = async () => {
    db.collection("posts").where("postId", "==", `${data.postId}`)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        let updatedDoc = doc.data();
        updatedDoc.votes += 1;
        doc.ref.update(updatedDoc);
        // data updated but re-render not triggered by react
      })
      .catch((error) => {
        console.error(error);
      });
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
            Posted by <Link to={`/u/${author}`}>{author}</Link> at {data.time} to <Link to={`/m/${data.board}`}>{data.board}</Link>
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