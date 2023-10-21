import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";

const Transactions = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
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
    fetch("https://libraryims-api.onrender.com/api/transactions", {
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
  const [newTransactionsData, setnewTransactionsData] = useState({
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
  const [modalState, setmodalState] = useState(false);
  const [errorModal, seterrorModal] = useState({
    statedisplay: false,
    message: "",
  });
  const newTransactionModalState = () => {
    setmodalState(prevval => !prevval);
  };
  const handleInputTransaction = e => {
    setnewTransactionsData(prevdata => {
      return {...prevdata, [e.target.name]: e.target.value};
    });
  };
  function submitTransaction(e) {
    e.preventDefault();
    fetch("https://libraryims-api.onrender.com/api/addtransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify({
        ...newTransactionsData,
        transactionId: uuidv4(),
        dateCreated: new Date().toLocaleDateString(),
        status: "Rented",
      }),
    })
      .then(res => {
        if (res.status == 200) {
          seterrorModal({statedisplay: true, message: "success"});
          setTimeout(() => {
            setmodalState(false);
            seterrorModal({statedisplay: false, message: ""});
            setnewTransactionsData({
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
          return res.json();
        } else {
          seterrorModal({statedisplay: true, message: "error"});
          setTimeout(() => {
            seterrorModal({statedisplay: false, message: ""});
            setnewTransactionsData({
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
        data &&
          setqueryData(prevdata => {
            return [...prevdata, data.data];
          });
      })
      .catch(err => {
        // console.log(err);
      });
  }
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
          <button onClick={newTransactionModalState}>
            <i className="material-symbols-outlined">add</i>
            Add new transaction
          </button>
        </div>
        <div className="custom-table">
          <p className="custom-caption">Current transactions</p>
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
                    <p
                      className={
                        transaction.status === "Rented"
                          ? "warning"
                          : transaction.status === "Completed"
                          ? "completed"
                          : "late"
                      }
                    >
                      {transaction.status}
                    </p>

                    <p>{transaction.staffname}</p>
                    <p>{transaction.fname + " " + transaction.lastname}</p>
                    <p>{transaction.title}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>{" "}
      {modalState && (
        <div
          className="modal"
          onClick={e => {
            e.target.classList[0] == "modal" &&
              setmodalState(prevval => !prevval);
          }}
        >
          <form onSubmit={submitTransaction}>
            <div className="form-text">
              <p>New transaction registration</p>
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
              <span>Return date</span>
              <input
                type="date"
                placeholder="Return date"
                required
                name="returnDate"
                value={newTransactionsData.returnDate}
                onChange={handleInputTransaction}
              />
            </label>
            <label>
              <span>Staff in charge</span>
              <input
                type="text"
                placeholder="Staff name"
                required
                name="staffname"
                value={newTransactionsData.staffname}
                onChange={handleInputTransaction}
              />
            </label>{" "}
            <label>
              <span>Library card ID</span>
              <input
                type="text"
                placeholder="Library card id"
                required
                name="libraryCardNumber"
                value={newTransactionsData.libraryCardNumber}
                onChange={handleInputTransaction}
              />
            </label>
            <label>
              <span>Member name</span>
              <input
                type="text"
                placeholder="Member name"
                required
                name="fname"
                value={newTransactionsData.fname}
                onChange={handleInputTransaction}
              />
            </label>
            <label>
              <span>Member surname</span>
              <input
                type="text"
                placeholder="Member surname"
                required
                name="lastname"
                value={newTransactionsData.lastname}
                onChange={handleInputTransaction}
              />
            </label>
            <label>
              <span>ISBN of the book</span>
              <input
                type="text"
                placeholder="ISBN code"
                required
                name="isbn"
                value={newTransactionsData.isbn}
                onChange={handleInputTransaction}
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

export default Transactions;
