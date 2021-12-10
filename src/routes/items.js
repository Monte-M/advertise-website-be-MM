const express = require('express');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { authenticateToken } = require('../utils/middleware');
const router = express.Router();

// GET /item/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT * FROM items
    `;
  const dbResult = await dbAction(sql, [id], [req.email]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// GET all items
router.get('/', async (req, res) => {
  const dbResult = await dbAction('SELECT * FROM items');
  if (dbResult === false) {
    return dbFail(res, 'error getting items');
  }
  return dbSuccess(res, dbResult);
});

// POST new item
router.post('/', authenticateToken, async (req, res) => {
  const sql = `INSERT INTO items (title, description, city, price, item_condition) VALUES (?, ?, ?, ?, ?)`;
  const { title, description, city, price, item_condition } = req.body;
  const dbResult = await dbAction(sql, [
    title,
    description,
    city,
    price,
    item_condition,
  ]);
  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  res.json({ msg: 'item added' });
});

module.exports = router;
