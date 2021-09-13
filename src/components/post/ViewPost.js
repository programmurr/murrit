import React, { useEffect, useState } from 'react';
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
  handleVote,
  getPostCommentIds,
  getComment
 } from '../../firebase';
 import formatTime from '../../utils/formatTime';
 import useUser from '../../hooks/useUser';


const PostPage = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;
const PostContainer = styled.div`
  display: flex;
  width: 97%;
  max-width: 955.6px;
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
    background-color: rgba(156, 255, 147, 0.7);
  }
`;

const DownvoteIcon = styled(UpvoteIcon)`
  margin-bottom: 0;
  margin-top: 2px;
  &:hover {
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

function ViewPost() {
  let { postid } = useParams();

  const user = useUser();

  const [livePost, setLivePost] = useState();
  const [commentCount, setCommentCount] = useState(0);
  const [refreshData, setRefreshData] = useState(true);
  useEffect(() => {
    db.collection("posts").where("id", "==", postid)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      const post = doc.data();
      setLivePost(post);
      setRefreshData(false);
    })
    .catch((error) => {
      console.error(error);
    });
    db.collection("comments").where("parentPostId", "==", postid)
      .get()
      .then((querySnapshot) => {
        let counter = 0;
        querySnapshot.forEach(() => {
          counter += 1;
        });
        setRefreshData(false);
        setCommentCount(counter);
      })
      .catch((error) => {
        console.error(error);
      });  
  }, [postid, refreshData]);

  const [author, setAuthor] = useState({});
  useEffect(() => {
    if (livePost !== undefined) {
      db.collection("users")
      .where("id", "==", livePost.author)
      .limit(1)
      .get()
        .then((querySnapshot) => {
          const doc = querySnapshot.docs[0];
          if (doc.exists) {
            const user = doc.data();
            setAuthor(user);
          } else {
            const nullAuthor = {
              id: "null",
              displayName: "[deleted]"
            };
            setAuthor(nullAuthor);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [livePost]);

  const [order, setOrder] = useState("time");
  const [postComments, setPostComments] = useState([]);
  useEffect(() => {
    if (livePost !== undefined) {
      getPostCommentIds(livePost.id)
        .then((commentIds) => {
          const commentPromises = commentIds.map((commentId) => {
            return getComment(commentId);
          });
          Promise.all(commentPromises)
            .then((comments) => {
              const sortedComments = comments.sort((a, b) => {
                  return b[`${order}`] - a[`${order}`];
              });
              setPostComments(sortedComments);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [livePost, order]);

  const handleVoteClick = (operator) => {
    if (user !== undefined) {
      handleVote("posts", operator, user.uid, livePost.id)
      .then(() => {
        setRefreshData(true);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  const handleRefreshComments = () => {
    setRefreshData(true);
  }

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
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
              Posted by <Link to={`/u/${author.id}`}>{author.displayName}</Link> {formatTime(livePost)} to <Link to={`/m/${livePost.board}`}>{livePost.board}</Link>
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
        <CommentWall className="CommentWall" commentCount={commentCount}>
          {
            user !== undefined
              ? <WriteComment 
                  parentId={livePost.id} 
                  parentPostId={livePost.id} 
                  refreshComments={handleRefreshComments} 
                  isReply={false}
                />
              : <p>Sign up or log in to comment</p>
          }
          <SortBox order={order} handleOrderChange={handleOrderChange} />
          {
            commentCount > 0
              ? postComments.map((comment, index) => (
                <PostComment 
                  key={comment.author + index} 
                  data={comment} 
                  handleRefreshComments={handleRefreshComments}
                  parentPostId={postid}
                  isReply={false}/>
                ))
            : <p>No comments</p>
          }
        </CommentWall>
      </PostPage>
    );
  } else {
    return <div>Post not found</div>
  }
  
}

export default ViewPost;