const {Router} = require("express");
const router = Router();

module.exports = (connection, mysql) => {
  router.get("/books", (req, res) => {
    connection.query(
      "select * from book b JOIN book_copies cp ON b.isbn = cp.isbn limit 100;",
      function (err, results, field) {
        console.log(results);
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400);
        }
      }
    );
  });
  router.post("/addbook", (req, res) => {
    const {
      ISBN,
      title,
      author,
      genre,
      publishDate,
      shelfLocation,
      copiesTotal,
    } = req.body;
    connection.query(
      "INSERT INTO book (isbn, title, author, genre, publishDate, shelfLocation) VALUES (?, ?, ?, ? ,?, ?)",
      [ISBN, title, author, genre, publishDate, shelfLocation],
      function (err, results, field) {
         if (!err) {
          connection.query(
            "INSERT INTO book_copies (isbn, copiesTotal) VALUES (?, ?)",
            [ISBN, copiesTotal],
            function (err, results, field) {
               if (!err) {
                res
                  .status(200)
                  .json({message: "Book inserted", data: req.body});
              } else {
                res.status(400).json({message: "Insertion failed"});
              }
            }
          );
        } else {
          res.status(400).json({message: "Insertion failed"});
        }
      }
    );
    // connection.query(
    //   "INSERT INTO member (libraryCardNumber, fname, lastname, age, dateRegistered, phoneNumber) VALUES (?, ?, ?, ? ,?, ?)",
    //   [libraryCardNumber, fname, lastname, age, formattedDate, phoneNumber],
    //   function (err, results, field) {
    //     if (!err) {
    //       res.status(200).json({message: "Member inserted", data: req.body});
    //     } else {
    //       res.status(400).json({message: "Insertion failed"});
    //     }
    //   }
    // );
  });
  return router;
};
