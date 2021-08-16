import React, { useEffect, useState } from 'react';
import { 
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import testPostData from '../../utils/posts';
import Post from '../post/Post';
import Comment from '../comment/Comment';
import SortBox from '../sort/SortBox';

const UserProfileContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: ${props => props.expand ? "6vh" : "" };
`;

const ContentSelectorContainer = styled.div`
  margin-top: 1rem;
  width: 95%;
  background-color: #ffffff;
  height: 4vh;
  min-height: 30px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  display: flex;
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

  const [data] = useState(testPostData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const authorPosts = data.filter((post) => post.author === username);
    setPosts(authorPosts);
  }, [data, username]);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    function getAuthorComments(allPosts) {
      let result = [];
      allPosts.forEach((post) => {
        if (
          post.comment !== undefined 
          && post.parentId !== undefined
          && post.author === username
        ) {
          result.push(post);
        }
        if (Array.isArray(post.comments)) {
          result = result.concat(getAuthorComments(post.comments));
        }
      });
      return result;
    };
    const authorComments = getAuthorComments(data);
    setComments(authorComments);
  }, [data, username]);

  const [postsSelected, setPostsSelected] = useState(true);
  const [commentsSelected, setCommentsSelected] = useState(false);

  const [expand, setExpand] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const navContainer = document.getElementById('nav-bar');
    const sticky = navContainer.offsetTop;
    document.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        if (isMounted) setExpand(true);
      } else {
        if (isMounted) setExpand(false);
      }
    });
    return () => { isMounted = false };
  });

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
    <UserProfileContainer className="UserProfileContainer" expand={expand}>
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
      <SortBox />
      {
        postsSelected
        ? posts.map((post, index) => (
          <Post key={post.title + index} data={post} />
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