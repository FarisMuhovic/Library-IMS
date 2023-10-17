import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {useEffect, useState} from "react";
const Transactions = ({setlinkClicked}) => {
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
        let names = item.fname + " " + item.lastname;
        return (
          names.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.staffname.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setfilteredData(filtered);
    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions", {
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
    <main className="transactions">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      <div className="members-grid">
        <div className="top-side-grid">
          <form>
            <input
              type="search"
              placeholder="Search for a transaction by a book name"
              onChange={handleInput}
            />
            <button>
              <i className="material-symbols-outlined">search</i>
            </button>
          </form>
          <button>
            <span>+ </span>
            Add new transaction
          </button>
        </div>
        <div className="custom-table">
          <p className="custom-caption">Current members</p>
          <div className="custom-header-table-row">
            <p>ID</p>
            <p>Date created</p>
            <p>Return Date</p>
            <p>Status</p>
            <p>Staff in charge</p>
            <p>Member</p>
            <p>Book name</p>
          </div>
          {filteredData
            ? filteredData.map(transaction => {
                return (
                  <div className="custom-table-row">
                    <p>{transaction.transactionId}</p>
                    <p>
                      {new Date(transaction.dateCreated).toLocaleDateString()}
                    </p>
                    <p>
                      {new Date(transaction.returnDate).toLocaleDateString()}
                    </p>
                    <p>{transaction.status}</p>
                    <p>{transaction.staffname}</p>
                    <p>{transaction.fname + " " + transaction.lastname}</p>
                    <p>{transaction.title}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </main>
  );
};

export default Transactions;
