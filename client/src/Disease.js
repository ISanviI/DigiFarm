import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Disease() {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [predict_class, setClass] = useState("Result")
  const baseURL = "http://localhost:7000"

  const postFile = async (File) => {
    try {
      const URL = `${baseURL}/${type}`
      console.log(`URL - ${URL}`)
      const response = await axios.post(URL, File, {
        method: "POST",
        headers: { "content-type": "multipart/form-data" },
      });
      const data = JSON.stringify(response);
      setClass(data)
      console.log("File uploaded successfully!")
      console.log(`Response - ${response}`)
    } catch (error) {
      console.error(`Axios Error occured - ${error}`);
    }
  };
  
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        alert("Please select a file first!");
        return;
      } else {
        const formdata = new FormData();
        formdata.append("file", file);
        await postFile(file);
      }
    } catch (error) {
      console.error(`Error in handling upload - ${error}`)
      console.error(`Error while uploading - ${error.message}`);
    }
  };

  return (
    <>
      <div id="classify"> <h2>{type.toUpperCase()} Disease Classification </h2></div>
      <div id="msg"> <h3>Upload your image file below to predict disease - 👇</h3></div>
      <form onSubmit={(e) => handleUpload(e)}>
        <input type="file" id="Pchoosefile" onChange={(e) => handleFileChange(e)} />
        <button type="submit" id="upload"> Upload </button>
        
      </form>
    </>
  );
}

export default Disease;
