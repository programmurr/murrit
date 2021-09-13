import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import { 
  getPosts
} from '../../firebase';

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
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const AllWall = styled.div`
  width: 97%;
  max-width: 980px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function All() {

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getPosts(order, "all")
      .then((posts) => {
        setData(posts);
        setFetchData(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchData, order]);

  const handleRefresh = () => {
    setFetchData(true);
  }

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  }
  
  return (
    <AllContainer className="AllContainer">
      <AllHeaderContainer>
        <h4>All Posts</h4>
        <SortBox order={order} handleOrderChange={handleOrderChange}/>
      </AllHeaderContainer>
      <AllWall className="AllWall">
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
            refreshData={handleRefresh}
          />
        ))}
      </AllWall>
    </AllContainer>
  )
}

export default All;