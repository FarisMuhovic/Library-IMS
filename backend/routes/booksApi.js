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
  return router;
};
