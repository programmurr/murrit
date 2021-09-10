import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import parse from 'html-react-parser';
import UpIcon from '../../img/up-arrow.svg';
import DownIcon from '../../img/down-arrow.svg';
import { 
  db, 
  handleVote
} from '../../firebase';
import formatTime from '../../utils/formatTime';
import useUser from '../../hooks/useUser';

const PostContainer = styled.div`
  display: flex;
  width: 95%;
  max-width: 955.6px;
  max-height: 250px;
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
    background-color: rgba(156, 255, 147, 0.7);
  }
`;

const DownvoteIcon = styled(UpvoteIcon)`
  margin-bottom: 0;
  margin-top: 2px;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 147, 147, 0.3);
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
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    cursor: pointer
  }
`;

const PostTitle = styled.h3`
  margin: 5px 0 5px 0;
  font-size: 1.25rem;
`;

const PostBody = styled.div`
  max-height: 140px;
  max-width: 824px;
  overflow: hidden;
  overflow-wrap: break-word;
  font-size: 0.85rem;
  min-height: 60px;
`;

const CommentCount = styled.p`
  font-size: 0.75rem;
  width: 100%;
`;

const ImageContainer = styled.div`
  height: 75%;
  align-self: center;
`;

const ImageBody = styled.img`
  height: 100%;
`;

function ImagePost(props) {
  return (
    <ImageContainer className="ImageContainer">
      <ImageBody className="ImageBody" src={props.url} alt=""/>
    </ImageContainer>
  )
}

function Post(props) {
  let history = useHistory();
  const { data } = props;

  const user = useUser();

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    db.collection("comments").where("parentPostId", "==", data.id)
    .get()
    .then((querySnapshot) => {
      let counter = 0;
      querySnapshot.forEach(() => {
        counter += 1;
      });
      setCommentCount(counter);
    })
    .catch((error) => {
      console.error(error);
    });  
}, [data.id]);

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
  }, [data.author]);


  const handlePostClick = () => {
    history.push(`/p/${data.id}`);
  }

  const handleVoteClick = async (operator) => {
    await handleVote("posts", operator, user.uid, data.id);
    props.refreshData();
  }

  return (
    <PostContainer className="PostContainer">
      <VoteContainer className="VoteContainer">
          <UpvoteIcon src={UpIcon} onClick={() => {handleVoteClick('+')}}/>
        <VoteCount>{data.votes}</VoteCount>
          <DownvoteIcon src={DownIcon} onClick={() => {handleVoteClick('-')}}/>
      </VoteContainer>
      <InnerPostContainer className="InnerPostContainer">
        <InfoContainer className="InfoContainer">
          <Info>
            Posted by <Link to={`/u/${author}`}>{author}</Link> {formatTime(data)} to <Link to={`/m/${data.board}`}>{data.board}</Link>
          </Info>
        </InfoContainer>
        <PostContentContainer className="PostContentContainer" onClick={handlePostClick}>
            <PostTitle >{data.title}</PostTitle>
            {data.type === "written"
              ? <PostBody className="PostBody">{parse(data.content)}</PostBody>
              : <ImagePost url={data.content} />
            }
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