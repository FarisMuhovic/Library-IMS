import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Members from "../components/Members";
import Books from "../components/Books";
import Employees from "../components/Employees";
import Transactions from "../components/Transactions";
import Settings from "../components/Settings";
import Sidebar from "../components/Sidebar";
import {Routes, Route, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

function App() {
  let navigate = useNavigate();
  const [sessionExists, setsessionExists] = useState("");
  const [linkClicked, setlinkClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/loggedin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          setsessionExists("auth");
        }
      })
      .then(data => {
        console.log(data.message);
        // data.message && setsessionExists("dash");
      })
      .catch(err => {
        console.log(err);
      });
  }, [linkClicked]);
  useEffect(() => {
    if (sessionExists == "dash") {
      navigate("/");
    } else if (sessionExists == "auth") {
      navigate("/login");
    }
  }, [sessionExists]);
  return (
    <div className="app">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Dashboard setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/members"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Members setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/books"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Books setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/employees"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Employees setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/transactions"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Transactions setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/settings"}
          element={
            <>
              <Sidebar setlinkClicked={setlinkClicked} />
              <Settings setlinkClicked={setlinkClicked} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
