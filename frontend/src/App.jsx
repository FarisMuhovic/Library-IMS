import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
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
    <>
      <Routes>
        {/* <Route path={"/"} element={<h1>Loading...Please Wait...</h1>} /> */}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
