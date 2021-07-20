import React, { useState } from 'react';
import styled from 'styled-components';
import testPostData from '../../utils/posts';
import Post from './Post';

const HomeContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #dbdbdb;
`;

const HomeWall = styled.div`
  margin-top: 0.75%;
  width: 97%;
  max-width: 980px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {

  // setData later
  const [data] = useState(testPostData);

  // TODO: 
  // Format date to 'X ago'
  // Recursively count comments and pass in with data
  // Lazy load posts
  return (
    <HomeContainer className="HomeContainer">
      <HomeWall className="HomeWall">
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
          />
        ))}
      </HomeWall>
    </HomeContainer>
  )
}

export default Home;