const {Router} = require("express");
const router = Router();
const {comparePasswords} = require("../utils/passwordHasher");

module.exports = (connection, mysql) => {
  router.post("/login", (req, res) => {
    const {email, password, rememberUser} = req.body;
   
    connection.query(
      "SELECT email,password FROM staff WHERE email =" + mysql.escape(email),
      function (err, results, fields) {
        if (
          results[0].email == email &&
          comparePasswords(password, results[0].password)
        ) {
          console.log("logged in");
          res.sendStatus(200);
          // setup sessions.
        } else {
          console.log("wrong password");
        }
      }
    );
  });

  return router;
};
