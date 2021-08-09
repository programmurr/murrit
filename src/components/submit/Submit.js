import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import testPostData from '../../utils/posts';

const SubmitContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
`;

const SubmitHeaderContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid white;
`;

const BoardSelectionContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const BoardSelectionLabel = styled.label`
  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 5px;
`;
const BoardSelectionSelect = styled.select`
  padding: 0.15rem;
  background-color: #ffffff;
`;

const SubmissionContainer = styled.div`
  width: 95%;
  margin-top: 10px;
  padding-bottom: 10px;
  max-width: 955.6px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 2rem;
  max-width: 955.6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  grid-gap: 1px;
  background-color: #c4c4c4;
  border: 1px solid white;
  border-radius: 5px;
`;

const Tab = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: #c6e8fc;
  }
  font-weight: ${props => props.selected ? "600" : "200"};
`;

function Submit() {
  const [data] = useState(testPostData);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);
  const [postTabSelected, setPostTabSelected] = useState(true);
  const [imageTabSelected, setImageTabSelected] = useState(false);

  useEffect(() => {
    const boards = data.map(post => post.board).sort();
    const uniqueBoards = [...new Set(boards)];
    setBoards(uniqueBoards);
  }, [data]);

  const handleChange = (event) => {
    setSelectedBoard(event.target.value);
  }

  const handleTabClick = (event) => {
    if (!postTabSelected && event.target.textContent === "Post") {
      setPostTabSelected(true);
      setImageTabSelected(false);
    } else if (!imageTabSelected && event.target.textContent === "Image") {
      setImageTabSelected(true);
      setPostTabSelected(false);
    }
  }

  return (
    <SubmitContainer>
      <SubmitHeaderContainer>
        <h2>Create a post</h2>
      </SubmitHeaderContainer>
      <BoardSelectionContainer>
        <BoardSelectionLabel htmlFor="board-select">Choose board:
          <BoardSelectionSelect value={selectedBoard} onChange={handleChange}>
            {boards.map((board, index) => (
              <option value={board} key={`${board}${index}`}>{board}</option>
            ))}
          </BoardSelectionSelect>
        </BoardSelectionLabel>
      </BoardSelectionContainer>
      <SubmissionContainer>
        <TabContainer>
          <Tab selected={postTabSelected} onClick={handleTabClick}>
            <p onClick={handleTabClick}>Post</p>
          </Tab>
          <Tab selected={imageTabSelected} onClick={handleTabClick}>
            <p>Image</p>
          </Tab>
        </TabContainer>
      </SubmissionContainer>
    </SubmitContainer>
  )
}

export default Submit;