import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Post from '../post/Post';
import SortBox from '../sort/SortBox';
import BoardPicker from '../board-picker/BoardPicker';
import useBoards from '../../hooks/useBoards';
import {
  getPaginatedPosts,
  getMorePaginatedPosts
} from '../../firebase';
import Portal from '../delete/Portal';
import DeleteModal from '../delete/DeleteModal';
import { DeleteContext } from '../../providers/DeleteProvider';

const WallContainer = styled.div`
  width: 100vw;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const WallHeaderContainer = styled.div`
  width: 93%;
  height: 5vh;
  min-height: 45px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const WallHeader = styled.h4`
  height: 50%;
`;

const Organisation = styled.div`
  display: flex;
  height: 50%;
  width: 55%;
  justify-content: space-between;
`;

const InnerWall = styled.div`
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

function Wall() {
  const deletePost = useContext(DeleteContext);
  let location = useLocation();
  const boardHook = useBoards();

  const [boardName, setBoardName] = useState("");
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") {
      setBoardName("all");
    } else {
      const index = pathname.indexOf('/m/');
      setBoardName(pathname.slice(index + 3));
    }
  }, [location]);

  const handleBoardChange = (newBoard) => {
    setBoardName(newBoard);
  }

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
      const wall = document.getElementById("wall");
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
    <WallContainer className="WallContainer">
    <WallHeaderContainer className="WallHeaderContainer">
      <WallHeader>{boardName}</WallHeader>
      <Organisation className="Organisation">
        <SortBox order={order} handleOrderChange={handleOrderChange}/>
        <BoardPicker boards={boardHook.boards} handleBoardChange={handleBoardChange} />
      </Organisation>
    </WallHeaderContainer>
      <InnerWall className="Wall" id="wall" onScroll={handleScroll}>
        {data.map((post, index) => (
          <Post
            key={post.title + index} 
            data={post}
            refreshData={handleRefresh}
          />
        ))}
      </InnerWall>
      {
        deletePost.deleteActive &&
          <Portal>
            <DeleteModal />
          </Portal>
      }
    </WallContainer>
  )
}

export default Wall;