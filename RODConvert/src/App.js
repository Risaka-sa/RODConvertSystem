import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';
import { CgAdd } from "react-icons/cg";
import { WiCloudUp } from "react-icons/wi";

function App() {
  const [files, setFiles] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    axios.post('http://127.0.0.1:5000/upload', formData)
      .then(response => {
        console.log(response.data);
        // Assuming the response includes the filename
        setDownloadLink(response.data.filename);
      })
      .catch(error => {
        console.error('There was an error uploading the file!', error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  

  const handleDownload = () => {
    if (downloadLink) {
      axios({
        url: `http://127.0.0.1:5000/download/${downloadLink}`,
        method: 'GET',
        responseType: 'blob', // Important to handle binary data
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', downloadLink);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error => {
        console.error('There was an error downloading the file!', error);
      });
    }
  };

  return (
    <body>
      <ul>
        <div class="img_box"><img src="https://th.kku.ac.th/wp-content/uploads/2019/11/LogoKKUthai_150px.png" style={{height:"20%", width:"20%"}} /></div>
        <div class="text-container">ระบบแปลงตารางเครื่องราช</div>
      </ul>
      <div>
        <div 
          {...getRootProps()} 
          class='input drop'
        >
          <input {...getInputProps()} />
          <WiCloudUp size='100px'/>
          <p>เลือกไฟล์ หรือ ลากมาที่นี่</p>
          <button class="button selectFile" onClick={onDrop}>
          <CgAdd size='20px'/>&nbsp;เลือกไฟล์
          </button>
        </div>

      <ul style={{ marginTop: '20px', listStyleType: 'none' }}>
        {files.map(file => (
          <li key={file.name} style={{ padding: '5px 0' }}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>

        <center><button class="button downloadBT">
          แปลงไฟล์
        </button></center>
      </div>
    </body>
  );
}

export default App;

