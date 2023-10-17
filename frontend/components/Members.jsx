import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {useEffect, useState} from "react";
const Members = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
  console.log(queryData);
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
        console.log(err);
      });
  }, []);

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
          <button>
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
            <p>Membership Info</p>
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
                    <button>Membership</button>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </main>
  );
};

export default Members;
