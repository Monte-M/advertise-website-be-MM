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

  const sql = 'SELECT * FROM users WHERE email = ?';
  const dbResult = await dbAction(sql, [req.body.email]);
  if (dbResult.length > 0) {
    console.log(dbResult);
    return res.status(400).send({
      error: [
        {
          errorMsg: 'such email already exists',
          field: 'email',
        },
      ],
    });
  }

  const sql2 = 'SELECT * FROM users WHERE username = ?';
  const dbResult2 = await dbAction(sql2, [req.body.username]);
  if (dbResult2.length > 0) {
    console.log(dbResult);
    return res.status(400).send({
      error: [
        {
          errorMsg: 'such username already exists',
          field: 'username',
        },
      ],
    });
  }

  const sql3 = `
  INSERT INTO users (username, email, city, phone_number, image, password )
  VALUES ( ?, ?, ?, ?, ?, ? )
  `;
  const dbResult3 = await dbAction(sql3, [
    newUser.username,
    newUser.email,
    newUser.city,
    newUser.phone_number,
    newUser.image,
    newUser.password,
  ]);
  if (dbResult3 === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  if (dbResult3.affectedRows === 1) {
    return res.json({ msg: 'register success', newUser: newUser.email });
  }

  console.log('ar vyksta');
  // else {

  // else {
});

// POST /users/login - log user
router.post('/login', validateLogin, async (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const dbResult = await dbAction(sql, [req.body.email]);
  console.log('dbResult', dbResult);
  if (dbResult.length !== 1) {
    return res.status(400).send({
      error: [
        {
          errorMsg: 'bad email or password',
          field: 'email',
        },
      ],
    });
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
