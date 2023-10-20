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
    fetch("https://libraryims-api.onrender.com/auth/loggedin", {
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
          navigate("/login", {replace: true});
        }
      })
      .then(data => {
        // console.log(data.message);
      })
      .catch(err => {
        // console.log(err);
      });
  }, [linkClicked, sessionExists, navigate]);
  useEffect(() => {
    if (sessionExists == "dash") {
      navigate("/");
    } else if (sessionExists == "auth") {
      navigate("/login", {replace: true});
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
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Dashboard setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/members"}
          element={
            <>
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Members setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/books"}
          element={
            <>
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Books setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/employees"}
          element={
            <>
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Employees setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/transactions"}
          element={
            <>
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Transactions setlinkClicked={setlinkClicked} />
            </>
          }
        />
        <Route
          path={"/settings"}
          element={
            <>
              <Sidebar
                setlinkClicked={setlinkClicked}
                setsessionExists={setsessionExists}
              />
              <Settings setlinkClicked={setlinkClicked} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
