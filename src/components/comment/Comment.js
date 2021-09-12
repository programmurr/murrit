import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  db
} from '../../firebase';
import formatTime from '../../utils/formatTime';

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
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

const CommentInfo = styled.p`
  font-size: 0.75rem;
  margin-bottom: 5px;
`;
const CommentBody = styled.p`
  font-size: 0.85rem;
`;

function Comment(props) {
  const { data, index, length } = props;
  let history = useHistory();

  const [author, setAuthor] = useState({});
  useEffect(() => {
    db.collection("users")
      .where("id", "==", data.author)
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
  }, [data.author]);

  const handleClick = () => {
    history.push(`/p/${data.parentPostId}`);
  }

  return (
    <CommentContainer className="CommentContainer" index={index} length={length}>
      <InnerCommentContainer className="InnerCommentContainer" onClick={handleClick}>
        <CommentInfo>{author.displayName} | {data.votes} votes | {formatTime(data)}</CommentInfo>
        <CommentBody>{data.comment}</CommentBody>
      </InnerCommentContainer>
    </CommentContainer>
  );
}

export default Comment;