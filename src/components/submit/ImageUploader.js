import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const UploaderContainer = styled.div`
  height: 50vh;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;;
  height: 200px;
  border: 2px dashed black;
  border-radius: 6px;
  width: 80%;
  height: 80%;
`;

const PreviewContainer = styled.div`
  display: ${props => props.active ? "block" : "none"};
  max-width: 150px;
  max-height: 150px;
`;
const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  opacity: 60%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  border: 1px solid black;
  padding: 0.5rem; 
  border-radius: 3px;
  &:hover{
    cursor: pointer;
    background-color: #dbdbdb;
  }
`;

function ImageUploader(props) {

  const { handleFile } = props;

  const imgPreview = useRef(null);
  const fileInput = useRef(null);

  const [previewActive, setPreviewActive] = useState(false);

  const [file, setFile] = useState(null);
  useEffect(() => {
    handleFile(file);
  }, [file, handleFile]);

  const handleChange = (event) => {
    const file = event.target.files[0]
    showThumbnail(file);
    setFile(file);
    setPreviewActive(true);
  }

  const onDragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  }

  const showThumbnail = (file) => {
    if (file !== null && !file.type.startsWith('image/')) { return; };
    const url = window.URL.createObjectURL(file);
    imgPreview.current.src = url;
    setPreviewActive(true);
  }

  const onDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const dt = event.dataTransfer;
    const file = dt.files[0];
    showThumbnail(file);
    setFile(file);
  }

  const clickInput = () => {
    fileInput.current.click();
  }
  
  return (
    <UploaderContainer className="UploaderContainer">
      <DropZone 
        className="DropZone"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <PreviewContainer className="PreviewContainer" active={previewActive}>
          <PreviewImage ref={imgPreview}/>
        </PreviewContainer>
        <label htmlFor="file-input">Drag your picture here or select to upload</label>
        <HiddenInput 
          type="file" 
          name="file-input" 
          id="file-input" 
          accept="image/*"
          ref={fileInput}
          onChange={handleChange}
        />
        <UploadButton onClick={clickInput}>Select Image</UploadButton>
      </DropZone>
    </UploaderContainer>
  );
};

export default ImageUploader;