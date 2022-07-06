import "./register.css"
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    if(username==""){
      alert("enter user name")
    }
    else if(email==""){
      alert("enter email")
    }
    else if(password==""){
      alert("enter password")
    }
    else{
    await fetch(`http://localhost:5000/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username":username,
        "email":email,
        "password":password
      })
  }).then(res => {
      return res.json();
  }).then((response) => {
      if(response.message=="stored"){
          window.location = "/login"
      }
      else{
          alert("Something went wrong..")
      }
  
  }).catch((error) => {
      console.log(error)
      
  })
}
  };
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <div className="registerForm">
      {/* <form className="registerForm" onSubmit={handleSubmit}> */}
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." 
         onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
        onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." 
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton"  onClick={()=>handleSubmit()}>Register</button>
      {/* </form> */}
      </div>
        <button className="registerLoginButton">
          <Link to="/login" className="links">Login</Link>
          </button>
    </div>
    )
}