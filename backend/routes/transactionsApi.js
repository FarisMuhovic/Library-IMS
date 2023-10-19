const {Router} = require("express");
const router = Router();
const dateConverter = require("../utils/dateConverter");

module.exports = (connection, mysql) => {
  router.get("/transactions", (req, res) => {
    connection.query(
      "select t.transactionId, t.dateCreated, t.returnDate, t.status, s.fname as staffname, b.title, m.fname,m.lastname from transaction t JOIN book b ON b.isbn = t.isbn JOIN staff s ON s.id = t.staffID JOIN member m on m.libraryCardNumber = t.libraryCardNumber limit 100;",
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
  router.post("/addtransaction", (req, res) => {
    const {
      transactionId,
      dateCreated,
      returnDate,
      status,
      staffname,
      fname,
      lastname,
      isbn,
      libraryCardNumber,
    } = req.body;
    const formattedDate = dateConverter(dateCreated);

    connection.query(
      "SELECT id FROM staff WHERE fname = ?",
      [staffname],
      function (err, results, fields) {
        console.log(err);
        if (!err && results.length > 0) {
          connection.query(
            "INSERT INTO transaction (transactionId, dateCreated, returnDate, isbn, status, libraryCardNumber,  staffID) VALUES (?,?,?,?,?,?,?)",
            [
              transactionId,
              formattedDate,
              returnDate,
              isbn,
              status,
              libraryCardNumber,
              results[0].id,
            ],
            function (err, results, field) {
              console.log(err);
              if (!err) {
                connection.query(
                  "UPDATE book_copies SET copiesTotal = copiesTotal - 1 WHERE isbn = ?",
                  [isbn]
                );
                res
                  .status(200)
                  .json({message: "Member inserted", data: req.body});
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
  });
  // make route that changes the status from rented to completed
  return router;
};
