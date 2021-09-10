import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UpIcon from '../../img/up-arrow.svg';
import DownIcon from '../../img/down-arrow.svg';
import {
  db,
  getComment,
  getCommentIds,
  handleVote
} from '../../firebase';
import formatTime from '../../utils/formatTime';
import useUser from '../../hooks/useUser';
import WriteComment from '../comment/WriteComment';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #c6e8fc;
  width: 100%;
  min-width: 300px;
  margin-bottom: 1rem;
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
  width: 50%;
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
    background-color: rgba(156, 255, 147, 0.7);
  }
`;

const Downvote = styled(Upvote)`
  margin-right: 0px;
  margin-left: 3px;
  &:hover {
    background-color: rgba(255, 147, 147, 0.3);
  }
`;

const ReplyLink = styled.p`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const CommentBody = styled.p`
  font-size: 0.9rem;
  padding-top: 2px;
  padding-bottom: 5px;
`;

function PostComment(props) {
  const { data, isReply, parentPostId } = props;
  const user = useUser();

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
  }, [data]);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (data.comments.length > 0) {
      getCommentIds(data.id)
        .then((commentIds) => {
          const commentPromises = commentIds.map((commentId) => {
            return getComment(commentId);
          });
          Promise.all(commentPromises)
            .then((comments) => {
              setComments(comments);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  const [voteString, setVoteString] = useState("");
  useEffect(() => {
    if (data.votes === -1 || data.votes === 1) {
      setVoteString(`${data.votes} vote`);
    } else {
      setVoteString(`${data.votes} votes`);
    }
  }, [data])

  const handleVoteClick = async (operator) => {
    if (user !== undefined) {
      await handleVote("comments", operator, user.uid, data.id);
      props.handleRefreshComments();
    }
  }

  const [replyClicked, setReplyClicked] = useState(false);

  const handleReplyClick = () => {
    setReplyClicked(prevState => !prevState);
  }

  const handleRefreshComments = () => {
    if (replyClicked) {
      setReplyClicked(false);
    }
    props.handleRefreshComments();
  }

  return (
    <CommentContainer className="CommentContainer">
      <ThreadContainer className="ThreadContainer" isReply={isReply}>
        <CommentThread className="CommentThread" />
      </ThreadContainer>
      <InnerCommentContainer className="InnerCommentContainer">
        <CommentInfo className="CommentInfoContainer">
          <CommentInfoElements className="CommentInfoElements">
            <Link to={`/u/${author}`}>{author}</Link>
            <VoteContainer>
              <Upvote 
                src={UpIcon}
                alt="Upvote Icon"
                onClick={() => {handleVoteClick('+')}}
              />
              {voteString}
              <Downvote 
                src={DownIcon} 
                alt="Downvote Icon"
                onClick={() => {handleVoteClick('-')}}
              />
            </VoteContainer> 
            <TimeStamp>
              {formatTime(data)}
            </TimeStamp>
            <ReplyLink onClick={handleReplyClick}>
              {replyClicked ? "Hide Reply" : "Reply"}
            </ReplyLink>
          </CommentInfoElements>
        </CommentInfo>
        <CommentBody className="CommentBody">{data.comment}</CommentBody>
        { 
          replyClicked 
            && <WriteComment 
                 parentId={data.id} 
                 parentPostId={parentPostId} 
                 refreshComments={handleRefreshComments} 
                 isReply={true}
               />
        }
        {
          comments.length > 0
          ? comments.map((comment, index) => (
            <PostComment 
              key={comment.author + index} 
              data={comment} 
              isReply={true} 
              parentPostId={parentPostId}
              handleRefreshComments={handleRefreshComments} />
          ))
          : <div className="BlanketyBlank" />
        }
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default PostComment;