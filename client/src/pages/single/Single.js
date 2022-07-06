import Sidebar from '../../Components/Sidebar/Sidebar'
import "./single.css";
import SinglePost from './../../Components/SinglePost/SinglePost';

export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
