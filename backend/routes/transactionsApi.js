const {Router} = require("express");
const router = Router();

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
  return router;
};
