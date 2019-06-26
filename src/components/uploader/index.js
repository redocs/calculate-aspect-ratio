import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
`;

const UploaderInner = styled.div`
  width: 100%;
`;

const UploaderContainer = styled.div`
  box-sizing: border-box;
  width: 80%;
  min-height: 60vh;
  display: flex;
  display: ${({ uploaded }) => (uploaded ? 'none' : 'flex')};
  background: #fff;
  border-radius: 2px;
  border: 1px dashed #636363;
  padding: 10px;

  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto 15px;
`;

const CenteredFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageTag = styled.img`
  max-width: 200px;
`;

const Uploader = props => {
  const { callback } = props;
  const [files, setFiles] = useState([]);
  const [isUploaded, setUploaded] = useState(false);
  const onDrop = acceptedFiles => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    acceptedFiles.map(file => openFile(URL.createObjectURL(file)));
    setUploaded(true);
    //console.log(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const openFile = file => {
    const img = new Image();
    img.src = file;
    img.onload = function() {
      var w = img.width;
      var h = img.height;
      const dimensions = {
        src: img.src,
        width: w,
        height: h
      };
      callback(dimensions);
      return dimensions;
    };
  };

  const thumbs = files.map(file => (
    <div key={file.name}>
      <CenteredFile>
        <ImageTag alt="Ratio Preview" src={file.preview} />
      </CenteredFile>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <UploaderInner>
      <UploaderContainer uploaded={!!isUploaded} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </UploaderContainer>
      {isUploaded && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </UploaderInner>
  );
};

export default Uploader;
