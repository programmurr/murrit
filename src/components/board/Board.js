import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import testPostData from '../../utils/posts';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';

const BoardContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: ${props => props.expand ? "6vh" : "" };
`;

const BoardHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
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

  // TODO: 
  // Board fetches its own data matching the board title. There is no
  //   point of a board fetching ALL then filtering in production.
  const [data, setData] = useState(testPostData);
  useEffect(() => {
    const filteredData = data.filter((post) => post.board === boardName);
    setData(filteredData);
    // TODO: Remove below rule-ignore when fetching from DB
    // eslint-disable-next-line
  }, [boardName])

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
  // Add "Sort By New/Rating" to Board Posts Header
  return (
    <BoardContainer className="BoardContainer" expand={expand}>
    <BoardHeaderContainer>
      <BoardHeader>{boardName}</BoardHeader>
      <SortBox />
    </BoardHeaderContainer>
      <BoardWBoard className="BoardWBoard">
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
          />
        ))}
      </BoardWBoard>
    </BoardContainer>
  )
}

export default Board;