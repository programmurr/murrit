import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import testPostData from '../../utils/posts';
import useFormInput from '../../hooks/useFormInput';
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CancelPost, SubmitPost } from './SubmissionButtons';

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
  grid-gap: 2px;
  background-color: #ccc;
`;

const Tab = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: ${props => props.name === "Post" ? "1px solid #ccc" : "0"};
  border-right: ${props => props.name === "Post" ? "0" : "1px solid #ccc"};
  &:hover {
    cursor: pointer;
    background-color: #c6e8fc;
  }
  font-weight: ${props => props.selected ? "600" : "200"};
`;

const CreatePostContainer = styled.div`
  margin-top: 1px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 9fr 1fr;
  place-items: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

const textAreaStyle = {
  "width": "95%",
  "padding": "0.5rem",
  "margin": "0.5rem 0 0.5rem 0",
  "fontSize": "1rem",
  "lineHeight": "1.25rem",
  "fontFamily": "Arial, sans-serif",
  "resize": "none",
  "border": "1px solid #a0a0a0",
  "borderRadius": "3px",
}

const TitleLengthPara = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #a0a0a0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const TitleError = styled.span`
  background-color: #ff0000;
  color: #ffffff;
`;

const TextError = styled.span`
  background-color: #ff0000;
  color: #ffffff;
`;

function Submit() {
  let history = useHistory();

  const titleError = useRef(null);
  const textError = useRef(null);

  const [data] = useState(testPostData);
  useEffect(() => {
    const boards = data.map(post => post.board).sort();
    const uniqueBoards = [...new Set(boards)];
    setBoards(uniqueBoards);
  }, [data]);

  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(boards[0]);
  const [postTabSelected, setPostTabSelected] = useState(true);
  const [imageTabSelected, setImageTabSelected] = useState(false);

  const title = useFormInput("");
  const [titleLength, setTitleLength] = useState(0);
  useEffect(() => {
    setTitleLength(title.value.length);
  }, [title]);

  const [text, setText] = useState('');
  const [textLength, setTextLength] = useState(0);
  useEffect(() => {
    setTextLength(text.length);
  }, [text]);

  const handleBoardChange = (event) => {
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

  const handleSubmit = (event) => {
    if (textLength < 15001 && titleLength > 0) {
      console.log('success');
      titleError.current.textContent = "";
      textError.current.textContent = "";
    } else if (textLength < 15001 && titleLength === 0) {
      titleError.current.textContent = "Error - No title";
    } else if (textLength > 15000) {
      textError.current.textContent = `Post needs to be less than 15,000 characters. Current number of characters is ${textLength}`;
    }
  }

  const handleCancelSubmit = () => {
    history.push(`/`);
  }

  return (
    <SubmitContainer>
      <SubmitHeaderContainer>
        <h2>Create a post</h2>
      </SubmitHeaderContainer>
      <BoardSelectionContainer>
        <BoardSelectionLabel htmlFor="board-select">Choose board:
          <BoardSelectionSelect value={selectedBoard} onChange={handleBoardChange}>
            {boards.map((board, index) => (
              <option value={board} key={`${board}${index}`}>{board}</option>
            ))}
          </BoardSelectionSelect>
        </BoardSelectionLabel>
      </BoardSelectionContainer>
      <SubmissionContainer>
        <TabContainer>
          <Tab selected={postTabSelected} onClick={handleTabClick} name="Post">
            <p onClick={handleTabClick}>Post</p>
          </Tab>
          <Tab selected={imageTabSelected} onClick={handleTabClick} name="Image">
            <p>Image</p>
          </Tab>
        </TabContainer>
        <CreatePostContainer>
          <TitleContainer>
            <TextareaAutosize
              style={textAreaStyle} 
              placeholder="Title"
              maxLength="300" 
              value={title.value}
              onChange={title.onChange} 
            />
            <TitleLengthPara>{titleLength}/300</TitleLengthPara>
            <TitleError ref={titleError}></TitleError>
          </TitleContainer>
          <ReactQuill 
            theme="snow"
            value={text}
            placeholder="Write your post here (optional)" 
            onChange={setText} 
          />
          <TextError ref={textError}></TextError>
          <ButtonContainer>
            <CancelPost handleCancelClick={handleCancelSubmit}/>
            <SubmitPost handleSubmitClick={handleSubmit}/>
          </ButtonContainer>
        </CreatePostContainer>
      </SubmissionContainer>
    </SubmitContainer>
  )
}

export default Submit;