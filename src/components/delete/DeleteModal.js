import React, { useContext } from "react";
import styled from "styled-components";
import { DeleteContext } from "../../providers/DeleteProvider";

const DeleteContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeletePage = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #000;
  opacity: 20%;
  z-index: 10;
  position: relative;
`;

const DeleteBox = styled.div`
  width: 40%;
  height: 20%;
  min-height: 210px;
  max-width: 378px;
  border-radius: 10px;
  box-shadow: 1px 0 .2em black, -1px 0 .2em black;
  background-color: #ffffff;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeleteText = styled.p`
  padding: 1rem;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const DeleteButton = styled.button`
  width: 90px;
  height: 25px;
  background-color: red;
  border-radius: 15px;
  color: #fff;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled(DeleteButton)`
  background-color: #fff;
  background-color: #000;
`;

function DeleteModal() {
  const deletePost = useContext(DeleteContext);
  
  const handleCancelClick = () => {
    deletePost.setDeleteActive(false);
  }

  return (
    <DeleteContainer className="DeleteContainer">
      <DeletePage className="DeletePage" />
      <DeleteBox className="DeleteBox">
        <DeleteText>Are you sure you want to delete this post? This page cannot be visited again and the post will be removed from your history, but user comments will still be visible on their profiles.</DeleteText>
        <ButtonContainer className="ButtonContainer">
          <DeleteButton>Delete</DeleteButton>
          <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
        </ButtonContainer>
      </DeleteBox>
    </DeleteContainer>
  )
}

export default DeleteModal;