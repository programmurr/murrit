import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import {
  getPosts
} from '../../firebase';

const BoardContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  min-height: 100%;
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

const BoardWBoard = styled.div`
  width: 97%;
  max-width: 980px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Board() {
  let { boardName } = useParams();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("time");
  const [fetchData, setFetchData] = useState(true);
  useEffect(() => {
    getPosts(order, boardName)
      .then((posts) => {
        setData(posts);
        setFetchData(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchData, order, boardName]);

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
      <BoardWBoard className="BoardWBoard">
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
            refreshData={handleRefresh}
          />
        ))}
      </BoardWBoard>
    </BoardContainer>
  )
}

export default Board;