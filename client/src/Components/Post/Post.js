import "./post.css"
import { Link } from "react-router-dom"
export default function  Post({post}) {
  const PF ="http://localhost:3000/images/"
  return (
    <div className='post'>
     
    {<img className="ImgPost" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlVYl3RoChUJgsSN97JMgqLVa1Q9kAfOTiug&usqp=CAU"    />}
        

        <div className="postInfo">
          <div className="postCategories">
          {post.length>0?post.map((c)=>{
            // <span className="postCategory">{c.name}</span>
          }):""}                          
          </div> 
          <Link to={`/post/?id=${post._id}`} className="links">
             <span className="postTitle">{post.title}</span>
          </Link>
          
         <span className="postDate">
              {new Date(post.createdAt).toDateString}
          </span>
        </div>
      <p className="postDescription">{post.desc}</p>
    </div>
   
   
  )
}
