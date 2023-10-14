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
        // console.log(data.message);
        data.message && setsessionExists("dash");
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (sessionExists == "dash") {
      navigate("/dashboard");
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
              <Sidebar />
              <Dashboard />
            </>
          }
        />
        <Route
          path={"/members"}
          element={
            <>
              <Sidebar />
              <Members />
            </>
          }
        />
        <Route
          path={"/books"}
          element={
            <>
              <Sidebar />
              <Books />
            </>
          }
        />
        <Route
          path={"/employees"}
          element={
            <>
              <Sidebar />
              <Employees />
            </>
          }
        />
        <Route
          path={"/transactions"}
          element={
            <>
              <Sidebar />
              <Transactions />
            </>
          }
        />
        <Route
          path={"/settings"}
          element={
            <>
              <Sidebar />
              <Settings />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
