const {Router} = require("express");
const router = Router();
const dateConverter = require("../utils/dateConverter");
module.exports = (connection, mysql) => {
  router.get("/members", (req, res) => {
    connection.query(
      "select libraryCardNumber,fname,lastname,age,dateRegistered,phoneNumber from member limit 50;",
      function (err, results, field) {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400);
        }
      }
    );
  });
  router.post("/addmember", (req, res) => {
    const {
      libraryCardNumber,
      fname,
      lastname,
      age,
      dateRegistered,
      phoneNumber,
    } = req.body;

    const formattedDate = dateConverter(dateRegistered);
    connection.query(
      "INSERT INTO member (libraryCardNumber, fname, lastname, age, dateRegistered, phoneNumber) VALUES (?, ?, ?, ? ,?, ?)",
      [libraryCardNumber, fname, lastname, age, formattedDate, phoneNumber],
      function (err, results, field) {
        if (!err) {
          res.status(200).json({message: "Member inserted", data: req.body});
        } else {
          res.status(400).json({message: "Insertion failed"});
        }
      }
    );
  });
  return router;
};
