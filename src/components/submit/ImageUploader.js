import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// TODO: Change height/weight values once drop zone is complete
const UploaderContainer = styled.div`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  border: 2px dashed black;
  border-radius: 6px;
`;

const PreviewContainer = styled.div`
  display: ${props => props.active ? "block" : "none"};
  width: 100px;
  height: 100px;
`;
const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
`;

// TODO:
// Re-style the ugly button and label with this advice https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
// i.e. have a nice translucent image svg, rounded dashed border, cursor pointer over a large area
function ImageUploader(props) {

  const { handleFile } = props;

  const imgPreview = useRef(null);

  const [previewActive, setPreviewActive] = useState(false);

  const [file, setFile] = useState(null);
  useEffect(() => {
    handleFile(file);
  }, [file, handleFile]);

  const handleChange = (event) => {
    const file = event.target.files[0]
    showThumbnail(file);
    setFile(file);
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
  
  return (
    <UploaderContainer className="UploaderContainer">
      <PreviewContainer className="PreviewContainer" active={previewActive}>
        <PreviewImage ref={imgPreview}/>
      </PreviewContainer>
      <DropZone 
        className="DropZone"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <label htmlFor="file-input">Drag your picture here or select to upload</label>
        <input type="file" name="file-input" id="file-input" onChange={handleChange}/>
      </DropZone>
    </UploaderContainer>
  );
};

export default ImageUploader;