import React, { useEffect, useState } from 'react';
import { 
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Post from '../post/Post';
import Comment from '../comment/Comment';
import SortBox from '../sort/SortBox';
import {
  getPaginatedUserPostsAndComments,
  getMorePaginatedUserPostsAndComments
} from '../../firebase';

const UserProfileContainer = styled.div`
  width: 100vw;
  height: 100%;
  max-width: 100%;
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
  margin-bottom: 1vh;
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

const SortOuterContainer = styled.div`
  width: 95%;
  max-width: 955.6px;
  display: flex;
`;

const PostWall = styled.div`
  width: 97%;
  height: 100vh;
  overflow: scroll;
  max-height: 80%;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  };
  scrollbar-width: none;
  margin-top: 0.5vh;
`;

function User() {
  let { username } = useParams();

  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [latestComment, setLatestComment] = useState(undefined);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getPaginatedUserPostsAndComments(username, order)
    .then((userData) => {
      setPosts(userData.allPosts);
      setComments(userData.allComments);
      setLatestPost(userData.latestPost);
      setLatestComment(userData.latestComment);
      setFetchData(false);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [fetchData, order, username]);

  const handleScroll = () => {
    if (latestPost && latestComment) {
      const wall = document.getElementById("wall");
      const triggerHeight = wall.scrollTop + wall.offsetHeight;
      if (triggerHeight >= wall.scrollHeight) {
        getMorePaginatedUserPostsAndComments(username, order, latestPost, latestComment)
        .then((userData) => {
          const newPosts = [...posts].concat(userData.allPosts);
          const newComments = [...comments].concat(userData.allComments);
          setPosts(newPosts);
          setComments(newComments);
          setLatestPost(userData.latestPost);
          setLatestComment(userData.latestComment);
          setFetchData(false);
            })
        .catch((error) => {
          console.error(error);
        });
      }
    }
  }

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
      <SortOuterContainer className="SortOuterContainer">
        <SortBox order={order} handleOrderChange={handleOrderChange}/>
      </SortOuterContainer>
      <PostWall className="PostWall" id="wall" onScroll={handleScroll}>
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
      </PostWall>
    </UserProfileContainer>
  );
}

export default User;