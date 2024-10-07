import React from "react";
import axios from 'axios';
import './App.css';
import { useDropzone } from "react-dropzone";
import { CgAdd } from "react-icons/cg";
import { WiCloudUp } from "react-icons/wi";
import { useState } from "react";

function Dropzone({ open }) {
  const [FileName,setFileName] = useState(undefined);
    const onDrop = (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);  // Assuming single file upload
    
        // Post the file to the Flask server
        axios.post('http://127.0.0.1:8000/upload', formData)
          .then(async response => {
            console.log(response.data);
            setFileName(response.data.filename);
          })
          .catch(error => {
            console.error('There was an error uploading the file!', error);
          });
      };
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({onDrop});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  async function download() {
      const response = await axios({
        url: 'http://localhost:8000/download', // Your FastAPI download endpoint
        method: 'POST',
        responseType: 'blob',  // Important to handle the file as a blob
      });

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', FileName+'(Convert).xlsx'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove();  // Remove the link after triggering the download
  };

  return (
    <div>
      <div {...getRootProps({ className: "input drop" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <WiCloudUp size='100px' style={{marginBottom:"-30px"}}/>
          <p className="dropzone-content">
          เลือกไฟล์ หรือ ลากมาที่นี่
          </p>
          <button class="button selectFile" onClick={onDrop}>
          <CgAdd size='20px'/>&nbsp;เลือกไฟล์
          </button>
        </div>
      </div>
      <center><p>
        {files}
      </p></center>
      <center><button class="button downloadBT" onClick={download}>
          แปลงไฟล์
      </button></center>
    </div>
    
  );
}

export default Dropzone;