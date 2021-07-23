import React, { useEffect, useState } from 'react';
import { 
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import testPostData from '../../utils/posts';
import Post from '../post/Post';

const ContentSelectorContainer = styled.div`
  height: 4vh;
  min-height: 30px;
  border-bottom: 1px solid black;
  display: flex;
`;

// Change style if active
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

  const [data, setData] = useState(testPostData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const authorPosts = data.filter((post) => post.author === username);
    setPosts(authorPosts);
  }, [data, username]);

  const [comments, setComments] = useState([]);
  useEffect(() => {
    function flatComments(allPosts) {
      // debugger;
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
          result = result.concat(flatComments(post.comments));
        }
      });
      return result;
    };
    const authorComments = flatComments(data);
    console.log(authorComments);
    setComments(authorComments);
  }, []);

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
    <div>
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
      {
        postsSelected
        ? posts.map((post, index) => (<Post key={post.title + index} data={post}/>))
        : comments.map((comment, index) => (
            <div key={comment.author + index}>{comment.author}, {comment.comment}</div>
          ))
      }
    </div>
  );
}

export default User;