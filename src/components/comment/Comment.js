import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TrashIcon from '../../img/trash.svg';
import {
  db
} from '../../firebase';
import formatTime from '../../utils/formatTime';
import useUser from '../../hooks/useUser';
import { DeleteContext } from '../../providers/DeleteProvider';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 97%;
  max-width: 955.6px;
  border-top: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  border-bottom: 5px solid #ffffff;
  background-color: #ffffff;
  border-top-left-radius: ${props => props.index === 0 ? "5px" : "0"};
  border-top-right-radius: ${props => props.index === 0 ? "5px" : "0"};
  border-bottom-right-radius: ${props => props.index === props.length ? "5px" : "0"};
  border-bottom-right-radius: ${props => props.index === props.length ? "5px" : "0"};
`;

const InnerCommentContainer = styled.div`
  background-color: #c6e8fc;
  width: 95%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 3px solid #c6e8fc;
  padding: 10px 10px 10px 10px;
  &:hover {
    cursor: pointer;
    border: 3px solid #c4c4c4;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TrashImage = styled.img`
  max-height: 15px;
  z-index: 10;
  &:hover {
    cursor: pointer;
  }
`;

const CommentInfoText = styled.p`
  font-size: 0.75rem;
  width: 100%;
`;


const CommentBody = styled.p`
  font-size: 0.85rem;
`;

function Comment(props) {
  const { data, index, length } = props;
  let history = useHistory();
  const user = useUser();
  const deletePost = useContext(DeleteContext);

  const [author, setAuthor] = useState({});
  useEffect(() => {
    db.collection("users")
      .where("id", "==", data.author)
      .limit(1)
      .get()
        .then((querySnapshot) => {
          const doc = querySnapshot.docs[0];
          if (doc) {
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
  }, [data.author]);

  const [isUserComment, setIsUserComment] = useState(false);
  useEffect(() => {
    if (user && data.author === user.id) {
      setIsUserComment(true);
    } else {
      setIsUserComment(false);
    }
  }, [data, user]);

  const handleClick = () => {
    history.push(`/p/${data.parentPostId}`);
  };

  const handleDelete = () => {
    deletePost.setItem({
      id: data.id,
      type: "comments"
    });
    deletePost.setDeleteActive(true);
  };

  useEffect(() => {
    if (deletePost.refresh) {
      deletePost.setRefresh(false);
      props.refreshData();
    }
  }, [deletePost]);

  return (
    <CommentContainer className="CommentContainer" index={index} length={length}>
      <InnerCommentContainer className="InnerCommentContainer">
        <CommentInfo className="CommentInfo">
          <CommentInfoText className="CommentInfoText" onClick={handleClick}>
            {author.displayName} | {data.votes} votes | {formatTime(data)}
          </CommentInfoText>
          {isUserComment && <TrashImage src={TrashIcon} alt="trash-can" onClick={handleDelete} />}
        </CommentInfo>
        <CommentBody onClick={handleClick}>{data.comment}</CommentBody>
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default Comment;