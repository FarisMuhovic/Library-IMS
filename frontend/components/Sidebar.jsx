import {NavLink, useNavigate} from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({setlinkClicked, setsessionExists}) => {
  const navigate = useNavigate();
  const linkClicked = () => {
    setlinkClicked(prevval => !prevval);
  };
  const logout = () => {
    fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => {
        document.cookie =
          "sid" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login", {replace: true});
      })

      .catch(err => {
        // console.log(err);
      });
  };
  return (
    <aside className="side-bar">
      <div className="logo">
        <img src="logo.png" alt="Company Logo" width={50} height={40} />
        <span>Libresys</span>
      </div>
      <ul className="side-nav-links">
        <li>
          <NavLink to={"/"} onClick={linkClicked}>
            <i className="material-symbols-outlined">dashboard</i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/members"} onClick={linkClicked}>
            <i className="material-symbols-outlined">group</i>
            <span>Members</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/books"} onClick={linkClicked}>
            <i className="material-symbols-outlined">book_2</i>
            <span>Books</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees"} onClick={linkClicked}>
            <i className="material-symbols-outlined">manage_accounts</i>
            <span>Employees</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/transactions"} onClick={linkClicked}>
            <i className="material-symbols-outlined">receipt_long</i>
            <span>Transactions</span>
          </NavLink>
        </li>
      </ul>
      <ul className="side-nav-tweaks">
        <li>
          <NavLink to={"/settings"} onClick={linkClicked}>
            <i className="material-symbols-outlined">settings</i>
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <button onClick={logout}>
            <i className="material-symbols-outlined">logout</i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
