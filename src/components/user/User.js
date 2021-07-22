import React, { useEffect, useState } from 'react';
import { 
  Switch,
  Route,
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

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postsSelected, setPostsSelected] = useState(true);
  const [commentsSelected, setCommentsSelected] = useState(false);

  
  return (
    <ContentSelectorContainer className="ContentSelectorContainer">
      <ContentSelector 
        active={postsSelected}
      >
          ALL POSTS
      </ContentSelector>
      <ContentSelector 
        active={commentsSelected}
      >
        ALL COMMENTS
      </ContentSelector>
    </ContentSelectorContainer>
  );
}

export default User;