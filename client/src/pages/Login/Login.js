import axios from "axios";
import { useContext, useRef,useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const handleSubmit = async (e) => {
    if(username==""){
      alert("enter user name")
    }
    else if(password==""){
      alert("enter password")
    }
    else{
      fetch(`http://localhost:5000/user/login/${username}/${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    }).then(res => res.json()).then((response) => {
      if(response[1].message=="suc"){
        localStorage.setItem("username",response[0].username)
        localStorage.setItem("id",response[0]._id)
        window.location="/"
      }
    }).catch((error) => {
        console.log("error", error);
        
    })
}
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      {/* <form className="loginForm" onSubmit={handleSubmit}> */}

<div className="loginForm">
          <label>UserName</label>
        <input className="loginInput" onChange={(e)=>setusername(e.target.value)} type="text" placeholder="Enter your Username..." ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" onChange={(e)=>setpassword(e.target.value)} placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" onClick={()=>handleSubmit()}>Login</button>
      {/* </form> */}
      </div>
        <button className="loginRegisterButton">
          <Link to="/register" className="links">Register</Link>
          </button>
    </div>
  );
}