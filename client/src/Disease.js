import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Disease() {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const baseURL = "http://localhost:7000"

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
      <div> {type.toUpperCase()} Disease Classification </div>
      <div>Upload your image file below to predict disease - 👇</div>
      <form onSubmit={(e) => handleUpload(e)}>
        <input type="file" onChange={(e) => handleFileChange(e)} />
        <button type="submit"> Upload </button>
      </form>
    </>
  );
}

export default Disease;
