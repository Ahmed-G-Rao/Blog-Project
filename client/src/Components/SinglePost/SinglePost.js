import "./singlePost.css"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from "../../context/Context";

export default function SinglePost() {
  const PF ="http://localhost:3000/images/"
  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
    const [post, setPost] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const {user}=useContext(Context);

    const handleDelete = async()=>{
      await fetch(`http://localhost:5000/posts/delete/${compIds}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  }).then(res => {
      return res.json();
  }).then((response) => {
      if(response.message=="deleted data"){
          window.location = "/"
      }
      else{
          alert("Something went wrong..")
      }
  
  }).catch((error) => {
      console.log(error)
      
  })
    }
    const handleUpdate = async () => {
      await fetch(`http://localhost:5000/posts/updatepost/${compIds}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title":title,
        "desc":desc,
        "username":localStorage.getItem("username")
      })
  }).then(res => {
      return res.json();
  }).then((response) => {
      if(response.message=="update data"){
          window.location = "/"
      }
      else{
          alert("Something went wrong..")
      }
  
  }).catch((error) => {
      console.log(error)
      
  })
    };
    useEffect(() => {
      fetch(`http://localhost:5000/posts/getAllpost`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    }).then(res => res.json()).then((response) => {
      console.log("response",response)
      var temp=[]
      temp=[...response]
      setPost([...temp])
    }).catch((error) => {
        console.log("error", error);
        
    })
      }, []);

  return (
    <div className="singlePost">
        {
          post.length>0?post.filter(data=>data._id==compIds).map(val=>(
<div className="singlePostDiv">
            {<img className="singlePostImage"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlVYl3RoChUJgsSN97JMgqLVa1Q9kAfOTiug&usqp=CAU" />
            }

          {updateMode ? (
          <input
            type="text"
            defaultValue={val.title}
            className="singlePostTitleInput"
            autoFocus  
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : ( 
          <h1 className="singlePostTitle">
            {val.title}
            {/* {post.username === localStorage.getItem("username") && ( */}
              <div className="singlePostEdit">
                {
                  val.username==localStorage.getItem("username")?
                  <>
                  <i className="singlePostIcons fa-solid fa-pen-to-square" 
               onClick={() => setUpdateMode(true)}></i>

              <i className="singlePostIcons fa-solid fa-trash-can" 
              onClick={handleDelete}></i>
                  </>
              :
              ""
                }
               

              </div>
             {/* )} */}
          </h1>
        )} 
            <div className="singlePostInformation">
                <span className="singlePostAuthor">Author : 
                <Link to={`/.?user=${val.username}`} className="links">
                <b>{val.username}</b>
                </Link>
                </span>
                <span className="singlePostDate">{new Date(val.createdAt).toDateString}</span>
            </div>

            {updateMode ? (
          <textarea
            className="singlePostDescriptionInput"
            defaultValue={val.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : ( 
           <p className="singlePostDescription">
           {val.desc}
            </p>
         )}
          {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}  
        </div>
          )):""
        }

    </div>
  )
}
