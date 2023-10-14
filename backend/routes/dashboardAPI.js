const {Router} = require("express");
const router = Router();

module.exports = (connection, mysql) => {
  router.get("/dashboard", (req, res) => {
    connection.query(
      `SELECT * FROM member
    WHERE DATE(dateRegistered) >= DATE(NOW() - INTERVAL 30 DAY) LIMIT 5;
    SELECT COUNT(*) as newmember_count FROM member
    WHERE DATE(dateRegistered) >= DATE(NOW() - INTERVAL 30 DAY);
    SELECT COUNT(*) as member_count FROM member;
    select COUNT(*) as book_count from book;
    select b.isbn,b.title, c.copiesTotal,b.author,b.genre from book b JOIN book_copies c ON b.isbn = c.isbn WHERE c.copiesTotal < 15 LIMIT 5;
    select COUNT(*) as transaction_count from transaction;
    select COUNT(*) as transactionRented_count from transaction WHERE status = "Rented";
    select t.transactionId, t.dateCreated, t.returnDate, b.title,t.status from transaction t JOIN book b ON b.isbn = t.isbn 
    WHERE t.status = "Rented" ORDER BY t.dateCreated DESC LIMIT 8;
    select Count(*) as lowbook_count from book b JOIN book_copies c ON b.isbn = c.isbn WHERE c.copiesTotal < 15;
`,
      function (err, results, field) {
        console.log(results);
        if (results) {
          res.status(200).json({
            newMembers: results[0],
            newMemberCount: results[1][0].newmember_count,
            totalMembers: results[2][0].member_count,
            differentBooks: results[3][0].book_count,
            lowQuantityBooks: results[4],
            transactionsCount: results[5][0].transaction_count,
            rentedTransactionsCount: results[6][0].transactionRented_count,
            rentedTransactions: results[7],
            lowQuantityBooksCount: results[8][0].lowbook_count,
          });
        } else {
          res.status(400);
        }
      }
    );
  });
  return router;
};
