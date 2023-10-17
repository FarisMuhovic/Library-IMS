const {Router} = require("express");
const router = Router();

module.exports = (connection, mysql) => {
  router.get("/members", (req, res) => {
    connection.query(
      "select libraryCardNumber,fname,lastname,age,dateRegistered,phoneNumber from member limit 50;",
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
