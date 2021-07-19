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
  background-color: #ececec;
`;

const HomeWall = styled.div`
  margin-top: 0.75%;
  width: 97%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  const [data, setData] = useState(testPostData);

  // format date to 'X ago'
  // recursively count comments and pass in with data
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