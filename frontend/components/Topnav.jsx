import {useLocation, Link} from "react-router-dom";
import "./topnav.css";
const TopNav = () => {
  const location = useLocation();
  let path = location.pathname;
  console.log(path);
  if (path == "/") {
    path = "Dashboard";
  } else {
    path = path.slice(1, path.length);
  }
  return (
    <nav className="top-nav">
      <span>{path}</span>
      <Link to={"/settings"}>
        <i className="material-symbols-outlined">account_circle</i>
      </Link>
    </nav>
  );
};

export default TopNav;
