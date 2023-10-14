import {NavLink} from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="side-bar">
      <div className="logo">
        <img src="logo.png" alt="Company Logo" width={50} height={40} />
        <span>Libresys</span>
      </div>
      <ul className="side-nav-links">
        <li>
          <NavLink to={"/"}>
            <i className="material-symbols-outlined">dashboard</i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/members"}>
            <i className="material-symbols-outlined">group</i>
            <span>Members</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/books"}>
            <i className="material-symbols-outlined">book_2</i>
            <span>Books</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees"}>
            <i className="material-symbols-outlined">manage_accounts</i>
            <span>Employees</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/transactions"}>
            <i className="material-symbols-outlined">receipt_long</i>
            <span>Transactions</span>
          </NavLink>
        </li>
      </ul>
      <ul className="side-nav-tweaks">
        <li>
          <NavLink to={"/settings"}>
            <i className="material-symbols-outlined">settings</i>
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <button>
            <i className="material-symbols-outlined">logout</i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
