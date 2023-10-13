const {Router} = require("express");
const router = Router();
const {comparePasswords} = require("../utils/passwordHasher");

module.exports = (connection, mysql) => {
  router.post("/login", (req, res) => {
    const {email, password, rememberUser} = req.body;

    connection.query(
      "select email,password,id from staff WHERE email =" + mysql.escape(email), // change later to add lots of info about that manager,
      function (err, results, fields) {
        if (results.length > 0) {
          if (comparePasswords(password, results[0].password)) {
            req.session.user = {
              email: email,
              id: results[0].id,
              // here goes other info
            };
            res.status(200).json({message: "User logged in"});
          } else {
            res.status(400).json({message: "Wrong info"});
          }
        } else {
          res.status(400).json({message: "Wrong info"});
        }
      }
    );
  });
  router.get("/loggedin", (req, res) => {
    if (req.session.user) {
      const {email, id} = req.session.user;
      connection.query(
        "select email,id from staff where email =" +
          mysql.escape(email) +
          "and id =" +
          mysql.escape(id),
        function (err, results, field) {
          res.status(200).json({message: "user is logged in"});
        }
      );
    } else {
      res.status(401).json({message: "invalid session"});
    }
  });
  return router;
};
