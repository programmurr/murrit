import React, { useEffect, useState, useContext } from 'react';
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
import Portal from '../delete/Portal';
import DeleteModal from '../delete/DeleteModal';
import { DeleteContext } from '../../providers/DeleteProvider';
import useUser from '../../hooks/useUser';

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
  width: 93%;
  background-color: #ffffff;
  height: 4vh;
  min-height: 30px;
  border-radius: 5px;
  display: flex;
  max-width: 955.6px;
  margin-bottom: 1vh;
`;

const AllDocumentsContainer = styled.div`
  width: 50%;
  display: flex;
`;

const ContentSelector = styled.p`
  font-size: 0.8rem;
  width: 30%;
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

const DeleteProfileContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteProfileButton = styled.button`
  width: 130px;
  height: 22px;
  margin-right: 1rem;
  background-color: red;
  border-radius: 15px;
  color: #fff;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const SortOuterContainer = styled.div`
  width: 93%;
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
  const authUser = useUser();
  let { username } = useParams();
  const deletePost = useContext(DeleteContext);

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
  };

  const handleRefresh = () => {
    setFetchData(true);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const [postsSelected, setPostsSelected] = useState(true);
  const [commentsSelected, setCommentsSelected] = useState(false);

  const togglePosts = () => {
    if (!postsSelected) {
      setPostsSelected(true);
      setCommentsSelected(false);
    }
  };
  
  const toggleComments = () => {
    if (!commentsSelected) {
      setCommentsSelected(true);
      setPostsSelected(false);
    }
  };

  const handleDeleteProfile = () => {
    deletePost.setItem({
      id: username,
      type: "users"
    });
    deletePost.setDeleteActive(true);
  };

  useEffect(() => {
    if (deletePost.refresh) {
      deletePost.setRefresh(false);
      handleRefresh();
    }
  }, [deletePost]);

  return (
    <UserProfileContainer className="UserProfileContainer">
      <ContentSelectorContainer className="ContentSelectorContainer">
        <AllDocumentsContainer className="AllDocumentsContainer">
          <ContentSelector 
            className="ContentSelector"
            active={postsSelected}
            onClick={togglePosts}
          >
              ALL POSTS
          </ContentSelector>
          <ContentSelector 
            className="ContentSelector"
            active={commentsSelected}
            onClick={toggleComments}
          >
            ALL COMMENTS
          </ContentSelector>
        </AllDocumentsContainer>
        {
          (authUser !== undefined && authUser.uid === username) &&
          <DeleteProfileContainer className="DeleteProfileContainer">
            <DeleteProfileButton className="DeleteProfileButton" onClick={handleDeleteProfile}>
              Delete profile
            </DeleteProfileButton>
          </DeleteProfileContainer>
        }
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
                refreshData={handleRefresh}
              />
            ))
        }
      </PostWall>
      {
        deletePost.deleteActive &&
          <Portal>
            <DeleteModal />
          </Portal>
      }
    </UserProfileContainer>
  );
}

export default User;