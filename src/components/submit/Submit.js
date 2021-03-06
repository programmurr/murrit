import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import useFormInput from '../../hooks/useFormInput';
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CancelPost, SubmitPost, AddBoard } from './SubmissionButtons';
import ImageUploader from './ImageUploader';
import BoardPicker from '../board-picker/BoardPicker';
import useUser from '../../hooks/useUser';
import useBoards from '../../hooks/useBoards';
import { 
  generatePostDocId, 
  generateImageDocument,
  updateUserDoc,
  addBoard 
} from '../../firebase';
import { v4 as uuidv4 } from 'uuid';


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
  max-width: 955.6px;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid white;
  border-radius: 5px;
  padding-bottom: 0.75rem;
`;

const BoardHandling = styled.div`
  width: 95%;
  max-width: 955.6px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-top: 0.75rem;
`;

const BoardCreationLabel = styled.label`
  padding: 0.3rem;
  background-color: #ffffff;
  border-radius: 5px;
`;
const BoardCreationTextInput = styled.input`
  padding: 0.3rem;
  background-color: #ffffff;
  border-radius: 5px;
`;

const CreateBoardPara = styled.p`
  margin: 0 1rem 0 1rem;
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
  const user = useUser();
  const boardHook = useBoards();

  const quillModules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link'],
    ],
  }

  const quillFormats = ['header', 'bold', 'italic', 'underline', 'link']

  const titleBox = useRef(null);
  const titleError = useRef(null);
  const submitError = useRef(null);
  const [titleErrorActive, setTitleErrorActive] = useState(false);
  const [submitErrorActive, setSubmitErrorActive] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState("");
  useEffect(() => {
    setSelectedBoard(boardHook.boards[0]);
  }, [boardHook.boards]);

  const handleBoardChange = (newBoard) => {
    setSelectedBoard(newBoard);
  }

  const newBoardName = useFormInput("");

  const handleAddBoard = () => {
    const regex = /^[a-zA-Z0-9\-_]+$/;
    if (regex.test(newBoardName.value)) {
      if (!boardHook.boards.includes(newBoardName.value)) {
        addBoard(newBoardName.value)
          .then(() => {
            let updatedBoards = boardHook.boards.concat(newBoardName.value);
            boardHook.update(updatedBoards);
            newBoardName.clear();
          })
          .catch((error) => {
            console.error("Error adding new board: ", error);
          })
      } else {
        alert("Board already exists! Please use a different name.");
      }
    } else {
      alert("Ensure there are no special characters or spaces in the board name.");
    }
  }

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

  const [image, setImage] = useState(null);
  const handleImage = (uploadImage) => {
    setImage(uploadImage);
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

  const handleSubmit = () => {
    const errors = checkForErrors();
    if (!errors && user !== null && user !== undefined) {
      const id = `pos_${uuidv4()}`;
      let post = {
        id: id,
        author: user.id,
        time: Date.now(),
        board: selectedBoard,
        title: title.value,
        votes: 1,
        comments: []
      };
      if (postTabSelected) {
        post.content = text;
        post.type = "written";
        generatePostDocId(post)
          .then(() => {
            updateUserDoc(user.uid, id);
            history.push(`/p/${post.id}`);
          })
          .catch((error) => { console.error(error) });
      } else {
        generateImageDocument(selectedBoard, image)
          .then((url) => {
            post.content = url;
            post.type = "image";    
            generatePostDocId(post)
              .then(() => {
                updateUserDoc(user.uid, id);
                history.push(`/p/${post.id}`);
              })
              .catch((error) => { console.error(error) });
          });
      }
      resetErrors();
    }
  }

  const handleCancelSubmit = () => {
    history.push(`/`);
  }

  return (
    <SubmitContainer className="SubmitContainer">
      <SubmitHeaderContainer className="SubmitHeaderContainer">
        <h2>Create a post</h2>
      </SubmitHeaderContainer>
      <BoardHandling>
        <BoardPicker boards={boardHook.boards} handleBoardChange={handleBoardChange} />
        <CreateBoardPara>or</CreateBoardPara>
          <BoardCreationLabel 
            className="BoardCreationLabel"
            htmlFor="new-board-name"
            >
              Create a Board:
          </BoardCreationLabel>
          <BoardCreationTextInput 
            className="BoardCreationTextInput"
            name="new-board-name"
            type="text"
            placeholder="my-super-board"
            maxLength="50"
            value={newBoardName.value}
            onChange={newBoardName.onChange}
          />
          <AddBoard handleAddBoardClick={handleAddBoard} />
      </BoardHandling>
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
              modules={quillModules}
              formats={quillFormats}
            />
          : <ImageUploader handleFile={handleImage}/>
          }
          <ButtonContainer className="ButtonContainer">
            <SubmitError ref={submitError} active={submitErrorActive}></SubmitError>
            <SubButtonContainer className="SubButtonContainer">
              <CancelPost handleCancelClick={handleCancelSubmit}/>
              <SubmitPost className="SubmitButton" handleSubmitClick={handleSubmit}/>
            </SubButtonContainer>
          </ButtonContainer>
        </CreatePostContainer>
      </SubmissionContainer>
    </SubmitContainer>
  );
};

export default Submit;