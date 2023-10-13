import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";
const Login = () => {
  let navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [labelStatus, setlabelStatus] = useState("");
  const changePasswordVisibility = () => {
    setVisibility(prev => !prev);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberUser: false,
  });
  const handleInputData = e => {
    setlabelStatus("");
    setFormData(prevdata => {
      const newFormData = {...prevdata};
      if (e.target.name == "rememberUser") {
        newFormData[e.target.name] = e.target.checked;
      } else {
        newFormData[e.target.name] = e.target.value;
      }
      return newFormData;
    });
  };
  const [loaderBtn, setloaderBtn] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setloaderBtn(true);
    await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then(res => {
        setloaderBtn(false);
        if (res.status == 200) {
          setlabelStatus("success");
          navigate("/dashboard");
        } else {
          console.log("wrong info");
          setlabelStatus("error");
        }
      })
      .catch(err => {
        console.log(err); // error
      });
  }
  return (
    <div className="login-page">
      <main>
        <section className="login-area">
          <section className="login-text">
            <img src="logo.png" alt="Company Logo" width={50} height={40} />
            <h2>Welcome back!</h2>
            <p>Log in to the system.</p>
          </section>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="text-input-label">
              <i className="material-symbols-outlined">mail</i>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleInputData}
                value={formData.email}
                className={labelStatus != "" ? labelStatus : ""}
              />
            </label>
            <label className="text-input-label">
              <i className="material-symbols-outlined">lock</i>
              <input
                type={visibility ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                onChange={handleInputData}
                value={formData.password}
                className={labelStatus != "" ? labelStatus : ""}
              />
              <button type="button" onClick={changePasswordVisibility}>
                <i className="material-symbols-outlined">
                  visibility{visibility ? "" : "_off"}
                </i>
              </button>
            </label>
            <label className="radio-input-label">
              <span>Remember me</span>
              <input
                type="checkbox"
                name="rememberUser"
                onChange={handleInputData}
                checked={formData.rememberUser}
              />
            </label>
            <button type="submit">
              {loaderBtn && <span class="loader"></span>}Login
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
