import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
import {useEffect, useState} from "react";
const Books = ({setlinkClicked}) => {
  const [queryData, setqueryData] = useState();
  const [filteredData, setfilteredData] = useState();
  const [searchInput, setsearchInput] = useState();
  const handleInput = e => {
    setsearchInput(e.target.value);
    if (e.target.value == "") {
      setfilteredData(queryData);
    } else {
      const filtered = queryData.filter(item => {
        return item.title.toLowerCase().includes(searchInput.toLowerCase());
      });
      setfilteredData(filtered);
    }
  };
  console.log(queryData);
  useEffect(() => {
    fetch("http://localhost:5000/api/books", {
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
    <main className="books">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      <div className="members-grid">
        <div className="top-side-grid">
          <form>
            <input
              type="search"
              placeholder="Search for a book"
              onChange={handleInput}
            />
            <button>
              <i className="material-symbols-outlined">search</i>
            </button>
          </form>
          <button>
            <span>+ </span>
            Add new book
          </button>
        </div>
        <div className="custom-table">
          <p className="custom-caption">Current members</p>
          <div className="custom-header-table-row">
            <p>ISBN</p>
            <p>Title</p>
            <p>Author</p>
            <p>Genre</p>
            <p>Publish date</p>
            <p>Shelf location</p>
            <p>Copies</p>
          </div>
          {filteredData
            ? filteredData.map(book => {
                return (
                  <div className="custom-table-row">
                    <p>{book.isbn}</p>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                    <p>{new Date(book.publishDate).toLocaleDateString()}</p>
                    <p>{book.shelfLocation}</p>
                    <p>{book.copiesTotal}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </main>
  );
};

export default Books;
