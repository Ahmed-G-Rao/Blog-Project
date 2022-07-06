import "./navbar.css";
import {Link} from "react-router-dom" ;
// import { Context } from "./context/Context";
import { Context } from "../../context/Context";
import { useContext } from "react";
export default function Navbar() {
    const { user , dispatch} = useContext(Context);
    const PF = "http://localhost:3000/images/";
    const handleLogout=()=>{
        localStorage.removeItem("username")
        localStorage.removeItem("id")
        window.location="/login"
    }
  return (

    <div className="nav">
        <div className="logos">
           {/* icons work */}
            <i className="Icons fa-brands fa-facebook"></i>
            <i className="Icons fa-brands fa-twitter"></i>
            <i className="Icons fa-brands fa-instagram"></i>
            <i className="Icons fa-brands fa-linkedin-in"></i>
        </div>
        <div className="menus">
            {/* menu list work */}
            <ul className="menuList"> 
                <li className="menuListItems">
                    <Link className="links" to="/">HOME</Link>
                </li>
                <li className="menuListItems"><Link className="links" to="/about">ABOUT</Link></li>
                <li className="menuListItems"><Link className="links" to="/write">WRITE</Link></li>
                <li className="menuListItems"><Link className="links" to="/">CONTACT</Link></li>
                {
                    localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?
                    <li className="menuListItems" onClick={handleLogout}>SIGN OUT</li>
                    :
                    ""
                }
                
            </ul>
        </div>
        <div className="search">
            {/* search bar work */}
            {
                localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?
                    <Link to={"/settings"} className="links"> 
                    {localStorage.getItem("username")}
                </Link>
                :
               
                
                    <ul className="menuList">
                        <li className="menuListItems">
                            <Link className="links" to="/login">LOGIN</Link>
                        </li>
                        <li className="menuListItems">
                            <Link className="links" to="/register">REGISTER</Link>
                        </li>
                    </ul>
                

            }
        {/* <i className="SearchIcon Icons fa-solid fa-magnifying-glass"></i> */}
        </div>
    </div>

  )
}
