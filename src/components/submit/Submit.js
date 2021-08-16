import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import testPostData from '../../utils/posts';
import useFormInput from '../../hooks/useFormInput';
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CancelPost, SubmitPost } from './SubmissionButtons';
import ImageUploader from './ImageUploader';

const SubmitContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dae0e6;
  margin-top: ${props => props.expand ? "6vh" : "" };
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  background-color: #ffffff;
`;

const PostTab = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  &:hover {
    cursor: pointer;
    background-color: #c6e8fc;
  }
  font-weight: ${props => props.selected ? "600" : "200"};
`;

const ImageTab = styled(PostTab)`
  border-left: 1px solid #ccc;
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
`;

const textAreaStyle = {
  "width": "95%",
  "padding": "0.5rem",
  "margin": "0.5rem 0 0 0",
  "fontSize": "1rem",
  "lineHeight": "1.25rem",
  "fontFamily": "Arial, sans-serif",
  "resize": "none",
  "border": "1px solid #a0a0a0",
  "borderRadius": "3px",
}

const TitleLengthPara = styled.p`
  grid-column: 2/3;
  font-size: 0.8rem;
  font-weight: 600;
  color: #a0a0a0;
`;

const TitleError = styled.span`
  visibility: ${props => props.active ? "block" : "hidden" };
  width: 12.5%;
  text-align: center;
  justify-self: center;
  font-size: 0.75rem;
  background-color: #ff0000;
  color: #ffffff;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid black;
  border-radius: 3px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SubButtonContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`;

const SubmitError = styled(TitleError)`
  visibility: ${props => props.active ? "block" : "hidden" };
  width: 95%;
  grid-column: 1/3;
`;

function Submit() {
  let history = useHistory();

  const titleBox = useRef(null);
  const titleError = useRef(null);
  const submitError = useRef(null);
  const [titleErrorActive, setTitleErrorActive] = useState(false);
  const [submitErrorActive, setSubmitErrorActive] = useState(false);

  const [boards, setBoards] = useState([]);
  const [data] = useState(testPostData);
  useEffect(() => {
    const boards = data.map(post => post.board).sort();
    const uniqueBoards = [...new Set(boards)];
    setBoards(uniqueBoards);
  }, [data]);

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

  const [image, setImage] = useState(null);
  const handleImage = (uploadImage) => {
    setImage(uploadImage);
  }

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


  const resetErrors = () => {
    titleError.current.textContent = "";
    submitError.current.textContent = "";
    setSubmitErrorActive(false);
    setTitleErrorActive(false);
  }

  const handleTitleError = () => {
    titleBox.current.focus();
    titleError.current.textContent = "No title";
    setTitleErrorActive(true);
  }

  const clearTitleError = () => {
    titleError.current.textContent = "";
    setTitleErrorActive(false);
  }

  const handleTextError = () => {
    submitError.current.textContent = `Post needs to be less than 15,000 characters. Current number of characters is ${textLength}`;
    setSubmitErrorActive(true);
  }

  const clearSubmitError = () => {
    submitError.current.textContent = "";
    setSubmitErrorActive(false);
  }

  const handleImageError = () => {
    submitError.current.textContent = "No image selected";
    setSubmitErrorActive(true);
  }

  const checkForErrors = () => {
    if (postTabSelected) {
      if (textLength < 15001 && titleLength === 0) {
        handleTitleError();
        clearSubmitError();
        return true;
      } else if (textLength > 15000 && titleLength === 0) {
        handleTitleError();
        handleTextError();
        return true;
      } else if (textLength > 15000) {
        handleTextError();
        clearTitleError();
        return true;
      }
    } else {
      if (image !== null && titleLength === 0) {
        handleTitleError();
        clearSubmitError();
        return true;
      } else if (image === null && titleLength === 0) {
        handleImageError();
        handleTitleError();
        return true;
      } else if (image === null) {
        handleImageError();
        clearTitleError();
        return true;
      }
    }
    return false;
  }

  const handleSubmit = (event) => {
    const errors = checkForErrors();
    if (!errors) {
      resetErrors();
      alert("Success");
    }
  }

  const handleCancelSubmit = () => {
    history.push(`/`);
  }

  return (
    <SubmitContainer className="SubmitContainer" expand={expand}>
      <SubmitHeaderContainer className="SubmitHeaderContainer">
        <h2>Create a post</h2>
      </SubmitHeaderContainer>
      <BoardSelectionContainer className="BoardSelectionContainer">
        <BoardSelectionLabel htmlFor="board-select">Choose board:
          <BoardSelectionSelect value={selectedBoard} onChange={handleBoardChange}>
            {boards.map((board, index) => (
              <option value={board} key={`${board}${index}`}>{board}</option>
            ))}
          </BoardSelectionSelect>
        </BoardSelectionLabel>
      </BoardSelectionContainer>
      <SubmissionContainer className="SubmissionContainer">
        <TabContainer className="TabContainer">
          <PostTab selected={postTabSelected} onClick={handleTabClick}>
            <p onClick={handleTabClick}>Post</p>
          </PostTab>
          <ImageTab selected={imageTabSelected} onClick={handleTabClick}>
            <p>Image</p>
          </ImageTab>
        </TabContainer>
        <CreatePostContainer className="CreatePostContainer">
          <TitleContainer className="TitleContainer">
            <TextareaAutosize
              ref={titleBox}
              style={textAreaStyle} 
              placeholder="Title"
              maxLength="300" 
              value={title.value}
              onChange={title.onChange} 
            />
            <TitleLengthPara>{titleLength}/300</TitleLengthPara>
            <TitleError ref={titleError} active={titleErrorActive}></TitleError>
          </TitleContainer>
          {postTabSelected 
          ? <ReactQuill 
              theme="snow"
              value={text}
              placeholder="Write your post here (optional)" 
              onChange={setText} 
            />
          : <ImageUploader handleFile={handleImage}/>
          }
          <ButtonContainer className="ButtonContainer">
            <SubmitError ref={submitError} active={submitErrorActive}></SubmitError>
            <SubButtonContainer className="SubButtonContainer">
              <CancelPost handleCancelClick={handleCancelSubmit}/>
              <SubmitPost handleSubmitClick={handleSubmit}/>
            </SubButtonContainer>
          </ButtonContainer>
        </CreatePostContainer>
      </SubmissionContainer>
    </SubmitContainer>
  );
};

export default Submit;