import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import parse from 'html-react-parser';
import UpIcon from '../../img/up-arrow.svg'
import DownIcon from '../../img/down-arrow.svg'
import PostComment from './PostComment';
import WriteComment from '../comment/WriteComment';
import SortBox from '../sort/SortBox';
import { 
  db,
  handleVote
 } from '../../firebase';
 import formatTime from '../../utils/formatTime';
 import { UserContext } from '../../providers/UserProvider';


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
  width: 5%;
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
  width: 95%;
  background-color: #ffffff;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Info = styled.p`
  font-size: 0.75rem;
`;

const PostContentContainer = styled.div`
`;

const PostTitle = styled.h3`
  margin: 5px 0 5px 0;
  font-size: 1.25rem;
`;

const PostBody = styled.div`
  overflow-wrap: break-word;
  height: auto;
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

const ImageContainer = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
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

// TODO:
// Make comments and test their display
// Implement voting for comments
function ViewPost() {
  let { postid } = useParams();

  const user = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const [livePost, setLivePost] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const [refreshData, setRefreshData] = useState(true);
  useEffect(() => {
    if (refreshData) {
      db.collection("posts").where("postId", "==", `${postid}`)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const post = doc.data();
        const count = post.comments.length;
        setLivePost(post);
        setCommentCount(count);
        setRefreshData(false);
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }, [postid, refreshData]);

  const [author, setAuthor] = useState("");
  useEffect(() => {
    if (livePost !== undefined) {
      db.collection("users").doc(livePost.author).get()
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
    }
  }, [livePost]);

  const handleVoteClick = async (operator) => {
    await handleVote(operator, currentUser.uid, livePost);
    setRefreshData(true);
  }

  if (livePost !== undefined) {
    return (
      <PostPage className="PostPage">
        <PostContainer className="PostContainer">
          <VoteContainer className="VoteContainer">
            <UpvoteIcon src={UpIcon} onClick={() => {handleVoteClick('+')}}/>
            <VoteCount>{livePost.votes}</VoteCount>
            <DownvoteIcon src={DownIcon} onClick={() => {handleVoteClick('-')}}/>
          </VoteContainer>
          <InnerPostContainer className="InnerPostContainer">
          <InfoContainer className="InfoContainer">
            <Info>
              Posted by <Link to={`/u/${author}`}>{author}</Link> {formatTime(livePost)} to <Link to={`/m/${livePost.board}`}>{livePost.board}</Link>
            </Info>
          </InfoContainer>
          <PostContentContainer className="PostContentContainer">
              <PostTitle >{livePost.title}</PostTitle>
              {livePost.type === "written"
                ? <PostBody className="PostBody">{parse(livePost.content)}</PostBody>
                : <ImagePost url={livePost.content} />
              }
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
            currentUser !== undefined
              ? <WriteComment postId={livePost.postId}/>
              : <div>Sign up or log in to comment</div>
          }
          {/* {
            commentCount > 0
              ? livePost.comments.map((comment, index) => (
                <PostComment key={comment.author + index} data={comment} isReply={false}/>
                ))
            : <div>No comments</div>
          } */}
        </CommentWall>
      </PostPage>
    );
  } else {
    return <div>Post not found</div>
  }
  
}

export default ViewPost;