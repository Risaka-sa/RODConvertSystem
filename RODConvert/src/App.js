import React, { useState } from 'react';
import Dropzone from "./Dropzone";
import FileTableList from "./FileTableList";
import axios from 'axios';
import './App.css';

function App() {

  return (
    <body>
      <ul>
        <div class="img_box"><img src="https://th.kku.ac.th/wp-content/uploads/2019/11/LogoKKUthai_150px.png" style={{height:"20%", width:"20%"}} /></div>
        <div class="text-container">ระบบแปลงตารางเครื่องราช</div>
      </ul>

      <div>
        <Dropzone />
      </div>
      <center><button class="button downloadBT">
          แปลงไฟล์
        </button></center>
    </body>
  );
}

export default App;

