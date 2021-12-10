const bcrypt = require('bcryptjs');

function hashValue(plainValue) {
  return bcrypt.hashSync(plainValue, 10);
}

function verifyHash() {}

module.exports = {
  hashValue,
  verifyHash,
};
