import "./write.css";
import { useState } from 'react';
import { axios } from 'axios';
import { useContext } from 'react';
import { Context } from "../../context/Context";

export default function Write() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const {user}=useContext(Context)
  const handleSubmit =async (e)=>{
    await fetch(`http://localhost:5000/posts/createpost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title":title,
        "desc":desc,
        "username":localStorage.getItem("username")
      })
  }).then(res => {
      return res.json();
  }).then((response) => {
      if(response.message=="stored"){
          window.location = "/"
      }
      else{
          alert("Something went wrong..")
      }
  
  }).catch((error) => {
      console.log(error)
      
  })
  }
  return (
    <div className="write">
      {file &&(
         <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
      )}

     
      {/* <form className="writeForm" onSubmit={handleSubmit}> */}
      <div className="writeForm">
        <div className="writeFormGroup">
          {/* <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label> */}
          {/* <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/> */}
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" onClick={()=>handleSubmit()}>
          Publish
        </button>
      {/* </form> */}
</div>
    </div>
  );
}