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
  height: 100%;
  max-width: 100%;
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
  height: 100vh;
  overflow: scroll;
  max-height: 80%;
  max-width: 980px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  };
  scrollbar-width: none;
`;

function All() {
  // TODO:
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

  const handleScroll = () => {
    if (latestDoc !== undefined) {
      const wall = document.getElementById("all-wall");
      const triggerHeight = wall.scrollTop + wall.offsetHeight;
      if (triggerHeight >= wall.scrollHeight) {
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
    }
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
      <AllWall className="AllWall" id="all-wall" onScroll={handleScroll}>
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