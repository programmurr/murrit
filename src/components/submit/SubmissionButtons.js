import React from 'react';
import styled from 'styled-components';

const CancelButton = styled.button`
  width: 90px;
  height: 25px;
  background-color: #ffffff;
  border-radius: 15px;
  border: 1px solid #008cff;
  color: #008cff;
  font-weight: 600;
  &:hover {
    background-color: #f7f8fd;
    cursor: pointer;
  }
`;

const SubmitButton = styled(CancelButton)`
  background-color: #008cff;
  color: #ffffff;
  &:hover {
    background-color: #0099ff;
  }
`;

const AddBoardButton = styled(SubmitButton)`
  margin-left: 1rem;
`;


export function CancelPost(props) {

  const handleClick = () => {
    props.handleCancelClick();
  }
  return (
    <CancelButton onClick={handleClick}>Cancel</CancelButton>
  );
};

export function SubmitPost(props) {

  const handleClick = () => {
    props.handleSubmitClick();
  }
  
  return (
    <SubmitButton onClick={handleClick}>Submit</SubmitButton>
  );
};

export function AddBoard(props) {

  const handleClick = () => {
    props.handleAddBoardClick();
  }
  
  return (
    <AddBoardButton onClick={handleClick}>Add</AddBoardButton>
  );
};

