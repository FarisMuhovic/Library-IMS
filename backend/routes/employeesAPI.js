const {Router} = require("express");
const router = Router();

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

  return router;
};
