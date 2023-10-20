import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {useEffect, useState} from "react";

const Dashboard = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
  useEffect(() => {
    fetch("https://libraryims-api.onrender.com/api/dashboard", {
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
        data && setqueryData(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);
  return (
    <main className="dashboard">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      <div className="dashboard-grid">
        <section className="members-overview">
          <h2>
            Total members <br />
            <span>{queryData ? queryData.totalMembers : 0}</span>
          </h2>
          <h2>
            New members <br />
            <span>{queryData ? queryData.newMemberCount : 0}</span>
          </h2>
          <div className="dash-table">
            <p className="dash-caption">Newest users</p>
            <div className="table-attributes row">
              <p>First name</p>
              <p>Last name</p>
              <p>Age</p>
              <p>Date registered</p>
            </div>

            {queryData
              ? queryData.newMembers.map(member => {
                  return (
                    <div className="table-row row">
                      <p>{member.fname}</p>
                      <p>{member.lastname}</p>
                      <p>{member.age}</p>
                      <p>
                        {new Date(member.dateRegistered).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })
              : ""}
          </div>
        </section>
        <section className="transactions-overview">
          <h2>
            Transactions <br />
            <span>{queryData ? queryData.transactionsCount : 0}</span>
          </h2>
          <h2>
            Active
            <br />
            <span>{queryData ? queryData.rentedTransactionsCount : 0}</span>
          </h2>
          <div className="dash-table">
            <p className="dash-caption">Latest transactions</p>
            <div className="table-attributes row">
              <p>Date created</p>
              <p>Return date</p>
              <p>Book Title</p>
              <p>Status</p>
            </div>

            {queryData
              ? queryData.rentedTransactions.map(transaction => {
                  return (
                    <div className="table-row row">
                      <p>
                        {new Date(transaction.dateCreated).toLocaleDateString()}
                      </p>
                      <p>
                        {new Date(transaction.returnDate).toLocaleDateString()}
                      </p>
                      <p>{transaction.title}</p>
                      <p>{transaction.status}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </section>
        <section className="books-overview">
          <h2>
            Unique books <br />
            <span>{queryData ? queryData.differentBooks : 0}</span>
          </h2>
          <h2>
            Low stock books
            <br />
            <span>{queryData ? queryData.lowQuantityBooksCount : 0}</span>
          </h2>
          <div className="dash-table">
            <p className="dash-caption">Books with low quantity.</p>
            <div className="table-attributes row">
              <p>Title</p>
              <p>Copies</p>
              <p>Author</p>
              <p>Genre</p>
            </div>

            {queryData
              ? queryData.lowQuantityBooks.map(book => {
                  return (
                    <div className="table-row row">
                      <p>{book.title}</p>
                      <p>{book.copiesTotal}</p>
                      <p>{book.author}</p>
                      <p>{book.genre}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
