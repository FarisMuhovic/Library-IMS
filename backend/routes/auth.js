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
            console.log("logged in");
            req.session.user = {
              email: email,
              id: results[0].id,
              // here goes other info
            };
            console.log(req.session);
            res.status(200).json({message: "User logged in"});
          } else {
            res.status(400).json({message: "Wrong password"});
          }
        } else {
          console.log("invalid info");
        }
      }
    );
  });

  return router;
};
