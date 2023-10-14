import {Link, useLocation} from "react-router-dom";

const Breadcrumbs = () => {
  let location = useLocation();
  // split into array by / to fix path
  return (
    <div className="breadcrumbs">
      <Link to={"/"}>
        <i className="material-symbols-outlined">home</i>
      </Link>
      <Link to={`${location.pathname}`}>{location.pathname}</Link>
    </div>
  );
};

export default Breadcrumbs;
