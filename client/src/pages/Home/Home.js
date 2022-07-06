import Header from "../../Components/Header/Header"
import Posts from "../../Components/Posts/Posts"
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./home.css"
import { useLocation } from "react-router";
import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


export default function Home() {
  const [posts,setPosts]=useState([]);
  const {search}=useLocation();
  useEffect(()=>{
    fetch(`http://localhost:5000/posts/getAllpost`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    }).then(res => res.json()).then((response) => {
      var temp=[]
      temp=[...response]
      setPosts([...temp])
    }).catch((error) => {
        console.log("error", error);
        
    })
  },[])

  return (
    <> 

      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
   </>
    
  )
}




