import React from "react";
import axios from 'axios';
import './App.css';
import { useDropzone } from "react-dropzone";
import { CgAdd } from "react-icons/cg";

function Dropzone({ open }) {
    const { getRootProps, getInputProps, acceptedFiles } =
    useDropzone({});

    const onDrop = (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);  // Assuming single file upload
    
        // Post the file to the Flask server
        axios.post('http://127.0.0.1:5000/upload', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('There was an error uploading the file!', error);
          });
      };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps({ className: "input drop" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
        เลือกไฟล์ หรือ ลากมาที่นี่
        </p>
        <button class="button selectFile" onClick={onDrop}>
        <CgAdd size='20px'/>&nbsp;เลือกไฟล์
        </button>
      </div>
    </div>
  );
}

export default Dropzone;