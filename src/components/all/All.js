import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import { 
  getPaginatedPosts,
  getMorePaginatedPosts
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

const LoadButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: #008cff;
  border-radius: 15px;
  border: 1px solid #008cff;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 2rem;
  &:hover {
    background-color: #0099ff;
    cursor: pointer;
  }
`;

function All() {

  // TODO:
  // DRY up pagination code
  // Implement load on scroll
  const [data, setData] = useState([]);
  const [latestDoc, setLatestDoc] = useState(undefined);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getPaginatedPosts(order, "all")
      .then((postsObject) => {
        setData(postsObject.allPosts);
        setLatestDoc(postsObject.latestDoc);
        setFetchData(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchData, order]);

  const handlePostLoad = () => {
    getMorePaginatedPosts(order, "all", latestDoc)
      .then((postsObject) => {
        const newPosts = [...data].concat(postsObject.allPosts);
        setData(newPosts);
        setLatestDoc(postsObject.latestDoc);
        setFetchData(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
        <LoadButton onClick={handlePostLoad}>Load more posts</LoadButton>
      </AllWall>
    </AllContainer>
  )
}

export default All;