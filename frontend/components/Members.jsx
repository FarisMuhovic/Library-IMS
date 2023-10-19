import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
const Members = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
  const [filteredData, setfilteredData] = useState();
  const [searchInput, setsearchInput] = useState();
  const handleInput = e => {
    setsearchInput(e.target.value);
    if (e.target.value == "") {
      setfilteredData(queryData);
    } else {
      const filtered = queryData.filter(item => {
        const names = item.fname + " " + item.lastname;
        return names.toLowerCase().includes(searchInput.toLowerCase());
      });
      setfilteredData(filtered);
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/members", {
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
        setfilteredData(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);
  const [newMemberData, setnewMemberData] = useState({
    libraryCardNumber: "",
    fname: "",
    lastname: "",
    age: "",
    dateRegistered: "",
    phoneNumber: "",
  });
  const [modalState, setmodalState] = useState(false);
  const [errorModal, seterrorModal] = useState({
    statedisplay: false,
    message: "",
  });
  const newMemberModalState = () => {
    setmodalState(prevval => !prevval);
  };
  const handleInputMember = e => {
    setnewMemberData(prevdata => {
      return {...prevdata, [e.target.name]: e.target.value};
    });
  };
  function submitMember(e) {
    e.preventDefault();
    fetch("http://localhost:5000/api/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...newMemberData,
        libraryCardNumber: uuidv4(),
        dateRegistered: new Date().toLocaleDateString(),
      }),
    })
      .then(res => {
        if (res.status == 200) {
          seterrorModal({statedisplay: true, message: "success"});
          setTimeout(() => {
            setmodalState(false);
            seterrorModal({statedisplay: false, message: ""});
            setnewMemberData({
              libraryCardNumber: "",
              fname: "",
              lastname: "",
              age: "",
              dateRegistered: "",
              phoneNumber: "",
            });
          }, 3000);
          return res.json();
        } else {
          seterrorModal({statedisplay: true, message: "error"});
          setTimeout(() => {
            seterrorModal({statedisplay: false, message: ""});
            setnewMemberData({
              transactionId: "",
              dateCreated: "",
              returnDate: "",
              status: "",
              staffname: "",
              fname: "",
              lastname: "",
              isbn: "",
              libraryCardNumber: "",
            });
          }, 3000);
        }
      })
      .then(data => {
        setqueryData(prevdata => {
          return [...prevdata, data.data];
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }
  return (
    <main className="members">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      <div className="members-grid">
        <div className="top-side-grid">
          <form>
            <input
              type="search"
              placeholder="Search for a user"
              onChange={handleInput}
            />
            <button>
              <i className="material-symbols-outlined">search</i>
            </button>
          </form>
          <button onClick={newMemberModalState}>
            <i className="material-symbols-outlined">add</i>
            <span>Add new member</span>
          </button>
        </div>
        <div className="custom-table">
          <p className="custom-caption">Current members</p>
          <div className="custom-header-table-row">
            <p>Library ID</p>
            <p>Name</p>
            <p>Age</p>
            <p>Date Registered</p>
            <p>Phone Number</p>
          </div>
          {filteredData
            ? filteredData.map(member => {
                return (
                  <div className="custom-table-row">
                    <p>{member.libraryCardNumber}</p>
                    <p>{member.fname + " " + member.lastname}</p>
                    <p>{member.age}</p>
                    <p>
                      {new Date(member.dateRegistered).toLocaleDateString()}
                    </p>
                    <p>{member.phoneNumber}</p>
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
          <form onSubmit={submitMember}>
            <div className="form-text">
              <p>New member registration</p>
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
                value={newMemberData.fname}
                onChange={handleInputMember}
              />
            </label>
            <label>
              <span>Last name</span>
              <input
                type="text"
                placeholder="Last name"
                required
                name="lastname"
                value={newMemberData.lastname}
                onChange={handleInputMember}
              />{" "}
            </label>
            <label>
              <span>Age</span>
              <input
                type="number"
                placeholder="Age"
                required
                name="age"
                value={newMemberData.age}
                onChange={handleInputMember}
              />
            </label>
            <label>
              <span>Phone number</span>
              <input
                type="phone"
                placeholder="Phone Number"
                required
                name="phoneNumber"
                value={newMemberData.phoneNumber}
                onChange={handleInputMember}
              />{" "}
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

export default Members;
