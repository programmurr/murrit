import React, { useEffect, useState } from 'react';
import { 
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Post from '../post/Post';
import Comment from '../comment/Comment';
import SortBox from '../sort/SortBox';
import {
  getUserPostsAndComments
} from '../../firebase';

const UserProfileContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const ContentSelectorContainer = styled.div`
  width: 95%;
  background-color: #ffffff;
  height: 4vh;
  min-height: 30px;
  border-radius: 5px;
  display: flex;
  max-width: 955.6px;
`;

const ContentSelector = styled.p`
  font-size: 0.8rem;
  width: 12.5%;
  font-weight: ${props => props.active ? "700" : 100};
  text-decoration: ${props => props.active ? "underline" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 75%;
  }
`;

function User() {
  let { username } = useParams();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getUserPostsAndComments(username, order)
      .then((userData) => {
        setPosts(userData.allPosts);
        setComments(userData.allComments);
        setFetchData(false);
      })
    .catch((error) => {
      console.error(error);
    })
  }, [fetchData, order, username]);

  const handleRefresh = () => {
    setFetchData(true);
  }

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  }

  const [postsSelected, setPostsSelected] = useState(true);
  const [commentsSelected, setCommentsSelected] = useState(false);

  const togglePosts = () => {
    if (!postsSelected) {
      setPostsSelected(true);
      setCommentsSelected(false);
    }
  }
  
  const toggleComments = () => {
    if (!commentsSelected) {
      setCommentsSelected(true);
      setPostsSelected(false);
    }
  }

  return (
    <UserProfileContainer className="UserProfileContainer">
      <ContentSelectorContainer className="ContentSelectorContainer">
        <ContentSelector 
          active={postsSelected}
          onClick={togglePosts}
        >
            ALL POSTS
        </ContentSelector>
        <ContentSelector 
          active={commentsSelected}
          onClick={toggleComments}
        >
          ALL COMMENTS
        </ContentSelector>
      </ContentSelectorContainer>
      <SortBox order={order} handleOrderChange={handleOrderChange}/>
      {
        postsSelected
        ? posts.map((post, index) => (
          <Post key={post.title + index} data={post} refreshData={handleRefresh} />
          ))
        : comments.map((comment, index) => (
            <Comment 
              key={comment.author + index} 
              data={comment} 
              index={index}
              length={comments.length - 1}
            />
          ))
      }
    </UserProfileContainer>
  );
}

export default User;