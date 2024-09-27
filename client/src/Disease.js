import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Disease() {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [predict_class, setClass] = useState("Result")
  const baseURL = "http://localhost:7000"

  const postFile = async (formData) => {
    try {
      const URL = `${baseURL}/${type}`
      console.log(`URL - ${URL}`)
      console.log(`formData - ${formData}`)
      const response = await axios.post(URL, formData, {
        method: "POST",
        headers: { "content-type": "multipart/form-data" },
      });
      const data = JSON.stringify(response);
      setClass(data)
      console.log("File uploaded successfully!")
      console.log(`Response - ${response}`)
    } catch (error) {
      console.error(`Axios Error occured - ${error.response}`);
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
        console.log(`formData - ${formdata}`)
        await postFile(formdata);
      }
    } catch (error) {
      console.error(`Error in handling upload - ${error.response}`)
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
        <input type="text" value={predict_class} readOnly/>
      </form>
    </>
  );
}

export default Disease;
