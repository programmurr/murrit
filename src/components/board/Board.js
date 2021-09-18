import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import {
  getPaginatedPosts,
  getMorePaginatedPosts
} from '../../firebase';

const BoardContainer = styled.div`
  width: 100vw;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const BoardHeaderContainer = styled.div`
  width: 95%;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const BoardHeader = styled.h4`
`;

const BoardWall = styled.div`
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

function Board() {
  let { boardName } = useParams();

  const [data, setData] = useState([]);
  const [latestDoc, setLatestDoc] = useState(undefined);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getPaginatedPosts(order, boardName)
      .then((postsObject) => {
        setData(postsObject.allPosts);
        setLatestDoc(postsObject.latestDoc);
        setFetchData(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchData, order, boardName]);

  const handleScroll = () => {
    if (latestDoc !== undefined) {
      const wall = document.getElementById("board-wall");
      const triggerHeight = wall.scrollTop + wall.offsetHeight;
      if (triggerHeight >= wall.scrollHeight) {
        getMorePaginatedPosts(order, boardName, latestDoc)
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
    <BoardContainer className="BoardContainer">
    <BoardHeaderContainer>
      <BoardHeader>{boardName}</BoardHeader>
      <SortBox order={order} handleOrderChange={handleOrderChange}/>
    </BoardHeaderContainer>
      <BoardWall className="BoardWall" id="board-wall" onScroll={handleScroll}>
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
            refreshData={handleRefresh}
          />
        ))}
      </BoardWall>
    </BoardContainer>
  )
}

export default Board;