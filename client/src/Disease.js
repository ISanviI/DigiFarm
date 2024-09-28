import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Disease() {
  const { type } = useParams();
  const [file, setFile] = useState(null);
  const [predict_class, setClass] = useState("Result")
  const [confidence, setConfidence] = useState("Accuracy")
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
      setClass(response.data.Prediction)
      setConfidence(response.data.Confidence)
      const data = JSON.stringify(response);
      console.log("File uploaded successfully!")
      console.log(`Response - ${data}`)
    } catch (error) {
      console.error(`Axios Error occured - ${error.response}`);
    }
  };

  useEffect(() => {
    windows.location.reload();
  }, [type])
  
  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    if (!file) {
      setClass("Prediction Result")
      setConfidence("Accuracy")
    }
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
      <div id="classify"> <h2>{type.toUpperCase()} Disease Classification </h2></div>
      <div id="msg"> <h3>Upload your image file below to predict disease - 👇</h3></div>
      <form onSubmit={(e) => handleUpload(e)}>
        <input type="file" id="Pchoosefile" onChange={(e) => handleFileChange(e)} />
        <button type="submit" id="upload"> Upload </button>
        <input type="text" value={predict_class} readOnly/>
        <input type="text" value={confidence} readOnly/>
      </form>
    </>
  );
}

export default Disease;
