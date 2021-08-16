import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import testPostData from '../../utils/posts';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';

const AllContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: ${props => props.expand ? "6vh" : "" };
`;

const AllHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const AllWall = styled.div`
  margin-top: 0.75%;
  width: 97%;
  max-width: 980px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function All() {

  // setData later
  const [data] = useState(testPostData);
  
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

  // TODO: 
  // Format date to 'X ago'
  // Lazy load posts
  return (
    <AllContainer className="AllContainer" expand={expand}>
      <AllHeaderContainer>
        <h4>All Posts</h4>
        <SortBox />
      </AllHeaderContainer>
      <AllWall className="AllWall">
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
          />
        ))}
      </AllWall>
    </AllContainer>
  )
}

export default All;