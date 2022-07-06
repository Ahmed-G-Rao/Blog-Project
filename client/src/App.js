import Navbar from "./Components/Navbar/Navbar";
import Register from "./pages/Register/Register";
import Settings from ".//pages//Settings/Settings"
import Write from "./pages/Write/Write";
import Home from "./pages/Home/Home"; 
import Single from "./pages/single/Single";
import Login from "./pages/Login/Login";
import { Context } from "./context/Context";
import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/login" element={localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?<Home/>:<Login/>}/>
      <Route path="/register" element={localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?<Home/>:<Register/>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/write" element={localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?<Write/>:<Login/>}/>
      <Route path="/settings" element={localStorage.getItem("id")!==null&&localStorage.getItem("id")!==undefined&&localStorage.getItem("id")!==""?<Settings/>:<Login/>}/>
      <Route path="/post" element={<Single/>}/>


{/* //V5 Code Obsleted */}
      {/* <Route exact path="/" element={<Home/>}/>
      <Route path="/login">{        user?<Home/>:<Login/>      }</Route>
      <Route path="/register">{        user?<Home/>:<Register/>      }</Route>
      <Route path="/write">{        user?<Write/>:<Login/>      }</Route>
      <Route path="/settings">{        user?<Settings/>:<Login/>      }</Route>
      <Route path="/post/postId"><Single/></Route> */}

     </Routes>
    </BrowserRouter>
 
    
    
  );
}

export default App;
