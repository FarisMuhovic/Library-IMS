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
  useEffect(() => {
    fetch("https://libraryims-api.onrender.com/api/books", {
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
  const [newBookData, setnewBookData] = useState({
    ISBN: "",
    title: "",
    author: "",
    genre: "",
    publishDate: "",
    shelfLocation: "",
    copiesTotal: 0,
  });
  const [modalState, setmodalState] = useState(false);
  const [errorModal, seterrorModal] = useState({
    statedisplay: false,
    message: "",
  });
  const newBookModalState = () => {
    setmodalState(prevval => !prevval);
  };
  const handleInputBook = e => {
    setnewBookData(prevdata => {
      return {...prevdata, [e.target.name]: e.target.value};
    });
  };
  function submitBook(e) {
    e.preventDefault();
    fetch("https://libraryims-api.onrender.com/api/addbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify(newBookData),
    })
      .then(res => {
        if (res.status == 200) {
          seterrorModal({statedisplay: true, message: "success"});
          setTimeout(() => {
            setmodalState(false);
            seterrorModal({statedisplay: false, message: ""});
            setnewBookData({
              ISBN: "",
              title: "",
              author: "",
              genre: "",
              publishDate: "",
              shelfLocation: "",
              copiesTotal: 0,
            });
          }, 3000);
          return res.json();
        } else {
          seterrorModal({statedisplay: true, message: "error"});
          setTimeout(() => {
            seterrorModal({statedisplay: false, message: ""});
            setnewBookData({
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
          setfilteredData(prevdata => {
            return [...prevdata, data.data];
          });
        // console.log(data);
      })
      .catch(err => {
        // console.log(err);
      });
  }
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
          <button onClick={newBookModalState}>
            <i className="material-symbols-outlined">add</i>
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
      {modalState && (
        <div
          className="modal"
          onClick={e => {
            e.target.classList[0] == "modal" &&
              setmodalState(prevval => !prevval);
          }}
        >
          <form onSubmit={submitBook}>
            <div className="form-text">
              <p>New book</p>
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
              <span>ISBN code</span>
              <input
                type="text"
                placeholder="ISBN code"
                required
                name="ISBN"
                value={newBookData.ISBN}
                onChange={handleInputBook}
              />
            </label>
            <label>
              <span>Title of the book</span>
              <input
                type="text"
                placeholder="Title"
                required
                name="title"
                value={newBookData.title}
                onChange={handleInputBook}
              />{" "}
            </label>
            <label>
              <span>Author</span>
              <input
                type="text"
                placeholder="Author"
                required
                name="author"
                value={newBookData.author}
                onChange={handleInputBook}
              />
            </label>
            <label>
              <span>Genre</span>
              <input
                type="text"
                placeholder="Genre"
                required
                name="genre"
                value={newBookData.genre}
                onChange={handleInputBook}
              />{" "}
            </label>
            <label>
              <span>Publish Date</span>
              <input
                type="date"
                placeholder="Date"
                required
                name="publishDate"
                value={newBookData.publishDate}
                onChange={handleInputBook}
              />
            </label>
            <div className="wrapper-label">
              {" "}
              <label>
                <span>Shelf location</span>
                <input
                  type="text"
                  placeholder="Shelf Location"
                  required
                  name="shelfLocation"
                  value={newBookData.shelfLocation}
                  onChange={handleInputBook}
                />
              </label>
              <label>
                <span>Copies</span>
                <input
                  type="number"
                  placeholder="Copies"
                  required
                  name="copiesTotal"
                  value={newBookData.copiesTotal}
                  onChange={handleInputBook}
                />{" "}
              </label>
            </div>
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

export default Books;
