import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import { db } from '../../firebase';

const AllContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: 6vh;
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

  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("posts").get()
      .then((querySnapshot) => {
        let newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  // TODO: 
  // Format date to 'X ago'
  // Lazy load posts
  return (
    <AllContainer className="AllContainer">
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