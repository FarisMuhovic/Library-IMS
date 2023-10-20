import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {useEffect, useState} from "react";

const Employees = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(data => {
        // console.log(data);
        setqueryData(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);
  const [newEmployeeData, setnewEmployeeData] = useState({
    fname: "",
    lastname: "",
    gender: "",
    role: "",
    email: "",
    password: "",
    dateHired: "",
  });
  const [modalState, setmodalState] = useState(false);
  const [errorModal, seterrorModal] = useState({
    statedisplay: false,
    message: "",
  });
  const newEmployeeModalState = () => {
    setmodalState(prevval => !prevval);
  };
  const handleInputEmployee = e => {
    setnewEmployeeData(prevdata => {
      return {...prevdata, [e.target.name]: e.target.value};
    });
  };
  function submitEmployee(e) {
    e.preventDefault();
    fetch("http://localhost:5000/api/addemployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...newEmployeeData,
        dateHired: new Date().toLocaleDateString(),
      }),
    })
      .then(res => {
        if (res.status == 200) {
          seterrorModal({statedisplay: true, message: "success"});
          setTimeout(() => {
            setmodalState(false);
            seterrorModal({statedisplay: false, message: ""});
            setnewEmployeeData({
              fname: "",
              lastname: "",
              gender: "",
              role: "",
              email: "",
              password: "",
              dateHired: "",
            });
          }, 3000);
          return res.json();
        } else {
          seterrorModal({statedisplay: true, message: "error"});
          setTimeout(() => {
            seterrorModal({statedisplay: false, message: ""});
            setnewEmployeeData({
              fname: "",
              lastname: "",
              gender: "",
              role: "",
              email: "",
              password: "",
              dateHired: "",
            });
          }, 3000);
        }
      })
      .then(data => {
        data &&
          setqueryData(prevdata => {
            return [...prevdata, data.data];
          });
        // console.log(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }
  console.log(newEmployeeData);
  return (
    <main className="employees">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      <div className="members-grid">
        <div className="top-side-grid">
          <button onClick={newEmployeeModalState} style={{marginLeft: "auto"}}>
            <i className="material-symbols-outlined">add</i>
            Add new employee
          </button>
        </div>
        <div className="custom-table">
          <p className="custom-caption">Current employees</p>
          <div className="custom-header-table-row">
            <p>ID</p>
            <p>Name</p>
            <p>gender</p>
            <p>Job role</p>
            <p>Email</p>
            <p>Date hired</p>
          </div>
          {queryData
            ? queryData.map(employee => {
                return (
                  <div className="custom-table-row">
                    <p>{employee.id}</p>
                    <p>{employee.fname + " " + employee.lastname}</p>
                    <p>{employee.gender}</p>
                    <p>{employee.role}</p> <p>{employee.email}</p>
                    <p>{new Date(employee.dateHired).toLocaleDateString()}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      {modalState && (
        <div
          className="modal"
          onClick={e => {
            e.target.classList[0] == "modal" &&
              setmodalState(prevval => !prevval);
          }}
        >
          <form onSubmit={submitEmployee}>
            <div className="form-text">
              <p>New Employee registration</p>
              <button
                type="button"
                className="exit-btn"
                onClick={() => {
                  setmodalState(false);
                }}
              >
                <i class="material-symbols-outlined">close</i>
              </button>
            </div>
            <label>
              <span>First name</span>
              <input
                type="text"
                placeholder="First name"
                required
                name="fname"
                value={newEmployeeData.fname}
                onChange={handleInputEmployee}
              />
            </label>
            <label>
              <span>Last name</span>
              <input
                type="text"
                placeholder="Last name"
                required
                name="lastname"
                value={newEmployeeData.lastname}
                onChange={handleInputEmployee}
              />
            </label>
            <label>
              <span>Gender</span>
              <select
                name="gender"
                id="gender"
                required
                value={newEmployeeData.gender}
                onChange={handleInputEmployee}
              >
                <option> </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              <span>Role</span>
              <select
                name="role"
                id="role"
                required
                value={newEmployeeData.role}
                onChange={handleInputEmployee}
              >
                <option> </option>
                <option value="manager">Manager</option>
                <option value="librarian">Librarian</option>
              </select>
            </label>{" "}
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={newEmployeeData.email}
                onChange={handleInputEmployee}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="password"
                required
                name="password"
                value={newEmployeeData.password}
                onChange={handleInputEmployee}
              />
            </label>
            <button type="submit" className="form-btn">
              <i className="material-symbols-outlined">add</i>
              <span>Add</span>
            </button>
          </form>
          {errorModal.statedisplay && (
            <p
              class={`error-modal ${
                errorModal.message == "error" ? "err" : "succ"
              }`}
            >
              {errorModal.message}
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Employees;
