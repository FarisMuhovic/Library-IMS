const {Router} = require("express");
const router = Router();
const dateConverter = require("../utils/dateConverter");
const {hashPassword} = require("../utils/passwordHasher");

module.exports = (connection, mysql) => {
  router.get("/employees", (req, res) => {
    connection.query(
      "select * from staff limit 100;",
      function (err, results, field) {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400);
        }
      }
    );
  });
  router.post("/addemployee", (req, res) => {
    const {fname, lastname, gender, role, email, password, dateHired} =
      req.body;
    const hashedPassword = hashPassword(password);
    const formatDate = dateConverter(dateHired);
    connection.query(
      "INSERT INTO staff(fname,lastname,gender,role,email,password,dateHired) VALUES (?,?,?,?,?,?,?)",
      [fname, lastname, gender, role, email, hashedPassword, formatDate],
      function (err, results, field) {
        console.log(err);
        if (!err) {
          res.status(200).json({message: "Employee inserted", data: req.body});
        } else {
          res.status(400).json({message: "Insertion failed"});
        }
      }
    );
    // connection.query(
    //   "INSERT INTO book (isbn, title, author, genre, publishDate, shelfLocation) VALUES (?, ?, ?, ? ,?, ?)",
    //   [ISBN, title, author, genre, publishDate, shelfLocation],
    //   function (err, results, field) {
    //      if (!err) {
    //       connection.query(
    //         "INSERT INTO book_copies (isbn, copiesTotal) VALUES (?, ?)",
    //         [ISBN, copiesTotal],
    //         function (err, results, field) {
    //            if (!err) {
    //             res
    //               .status(200)
    //               .json({message: "Book inserted", data: req.body});
    //           } else {
    //             res.status(400).json({message: "Insertion failed"});
    //           }
    //         }
    //       );
    //     } else {
    //       res.status(400).json({message: "Insertion failed"});
    //     }
    //   }
    // );
  });
  return router;
};
