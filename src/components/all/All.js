import React, { useState } from 'react';
import styled from 'styled-components';
import testPostData from '../../utils/posts';
import Post from '../post/Post';

const AllContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const AllHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const AllHeader = styled.h4`
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

  // TODO: 
  // Format date to 'X ago'
  // Lazy load posts
  // Add "Sort By New/Rating" to All Posts Header
  return (
    <AllContainer className="AllContainer">
    <AllHeaderContainer>
      <AllHeader>All Posts</AllHeader>
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