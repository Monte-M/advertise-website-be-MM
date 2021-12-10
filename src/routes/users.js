const express = require('express');
const { dbAction, dbFail } = require('../utils/dbHelper');
const { hashValue, verifyHash } = require('../utils/hashHelper');
const { validateRegister } = require('../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { validateLogin } = require('../utils/validateHelper');

const router = express.Router();

// POST /users/register - create new user,
router.post('/register', validateRegister, async (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    city: req.body.city,
    phone_number: req.body.phone_number,
    image: req.body.image,
    password: hashValue(req.body.password),
  };

  // check if user exists

  // const sql = `
  //  SELECT * FROM users
  //  WHERE username = ?
  //  `;
  // const dbResult = await dbAction(sql, [req.username]);
  // if (dbResult === true) {
  //   return res.json({ msg: 'Such user already exists' });
  // }

  const sql = `
  INSERT INTO users (username, email, city, phone_number, image, password )
  VALUES ( ?, ?, ?, ?, ?, ? )
  `;
  const dbResult = await dbAction(sql, [
    newUser.username,
    newUser.email,
    newUser.city,
    newUser.phone_number,
    newUser.image,
    newUser.password,
  ]);
  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  if (dbResult.affectedRows === 1) {
    return res.json({ msg: 'register success', newUser: newUser.email });
  }
  res.status(500).json({ error: 'something went wrong' });
});

// POST /users/login - log user
router.post('/login', validateLogin, async (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const dbResult = await dbAction(sql, [req.body.email]);
  if (dbResult.length !== 1) {
    return dbFail(res, 'email does not exsits', 400);
  }
  if (!verifyHash(req.body.password, dbResult[0].password)) {
    return dbFail(res, 'passwords not match');
  }
  const token = jwt.sign({ email: req.body.email }, jwtSecret, {
    expiresIn: '1h',
  });
  const loggedInUser = {
    id: dbResult[0].id,
    email: req.body.email,
    token: token,
  };
  res.json({ msg: 'success', loggedInUser });
});

module.exports = router;
