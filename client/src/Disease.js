import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Disease() {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const baseURL = "http://localhost:8000"

  const postFile = async (image) => {
    try {
      const URL = `${baseURL}/${type}`
      console.log(`URL - ${URL}`)
      const response = await axios.post(URL, image, {
        method: "POST",
        headers: { "content-type": "multipart/form-data" },
      });
      console.log("File uploaded successfully!")
      console.log(`Response - ${response}`)
    } catch (error) {
      console.error(`Axios Error occured - ${error}`);
      console.error(`Axios Error message - ${error.message}`);
      console.error(`Axios Error response - ${error.response.data}`);
      console.error(`Axios Error request - ${error.request}`);
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
      <div> <h3>Upload your image file below to predict disease - 👇</h3></div>
      <form onSubmit={(e) => handleUpload(e)}>
        <input type="file" class="btn btn-outline-light" id="Pchoosefile" onChange={(e) => handleFileChange(e)} />
        <button type="submit" class="btn btn-outline-success" id="upload"> Upload </button>
      </form>
    </>
  );
}

export default Disease;
