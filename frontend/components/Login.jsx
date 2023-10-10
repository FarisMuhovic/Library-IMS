import React, {useState} from "react";
import "./login.css";
const Login = () => {
  const [visibility, setVisibility] = useState(false);
  const changePasswordVisibility = () => {
    setVisibility(prev => !prev);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberUser: false,
  });
  const handleInputData = e => {
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
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form Data is being submitted, Your data:", formData);
    // here goes the errors and stuff
  };
  return (
    <div className="login-page">
      <main>
        <section className="login-area">
          <sectio className="login-text">
            <img src="logo.png" alt="Company Logo" width={50} height={40} />
            <h2>Welcome back!</h2>
            <p>Log in to the system.</p>
          </sectio>
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
            <button type="submit">Login</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
