const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

function comparePasswords(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}
module.exports = {
  hashPassword,
  comparePasswords,
};
