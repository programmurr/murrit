import React, { useState } from 'react';
import styled from 'styled-components';

const BoardChoiceContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const BoardSelectionLabel = styled.label`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
`;
const BoardSelectionSelect = styled.select`
  background-color: #ffffff;
  padding: 0.15rem 0.9rem 0.15rem 0.9rem;
  border-radius: 5px;

`;

function BoardPicker(props) {

  const { boards } = props; 

  const [selectedBoard, setSelectedBoard] = useState("");

  const handleBoardChange = (event) => {
    setSelectedBoard(event.target.value);
    props.handleBoardChange(event.target.value);
  }

  return (
    <BoardChoiceContainer className="BoardChoiceContainer">
      <BoardSelectionLabel htmlFor="board-select">Choose board:</BoardSelectionLabel> 
        <BoardSelectionSelect value={selectedBoard} onChange={handleBoardChange}>
          {boards.map((board, index) => (
            <option value={board} key={`${board}${index}`}>{board}</option>
          ))}
      </BoardSelectionSelect>
    </BoardChoiceContainer>
  )
}

export default BoardPicker;