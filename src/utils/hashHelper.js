const bcrypt = require('bcryptjs');

function hashValue(plainValue) {
  return bcrypt.hashSync(plainValue, 10);
}

function verifyHash(hashedPass, hash) {
  if (bcrypt.compareSync(hashedPass, hash)) {
    return true;
  }
}

module.exports = {
  hashValue,
  verifyHash,
};
