const express = require('express');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { authenticateToken } = require('../utils/middleware');
const router = express.Router();

// GET all user ads
router.get('/user-items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT items.id, items.category_id, items.title, items.description, items.city, items.price, items.item_condition, items.image, items.post_timestamp, categories.category
  FROM items
  INNER JOIN categories
  ON items.category_id = categories.id
  WHERE user_id = ?
    `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// // GET all items
router.get('/', async (req, res) => {
  const dbResult = await dbAction(`
  SELECT items.id, items.category_id, items.title, items.description, items.city, items.price, items.item_condition, items.image, items.post_timestamp, categories.category
  FROM items
  INNER JOIN categories
  ON items.category_id = categories.id
`);
  if (dbResult === false) {
    return dbFail(res, 'error getting items');
  }
  return dbSuccess(res, dbResult);
});

// GET /item/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT items.id, items.title, items.description, items.city, items.price, items.item_condition, items.image, items.post_timestamp, users.id AS 'user_id', users.username, users.email, users.city AS 'user_city', users.phone_number, users.image AS 'user_image', users.reg_timestamp, categories.category
  FROM items
  INNER JOIN users
  ON items.user_id = users.id
  INNER JOIN categories
  ON items.category_id = categories.id
  WHERE items.id = ?
    `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// POST new item
router.post('/', authenticateToken, async (req, res) => {
  const sql = `INSERT INTO items (title, user_id, category_id,  description, city, price, item_condition, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const {
    title,
    user_id,
    category_id,
    description,
    city,
    price,
    item_condition,
    image,
  } = req.body;
  const dbResult = await dbAction(sql, [
    title,
    user_id,
    category_id,
    description,
    city,
    price,
    item_condition,
    image,
  ]);
  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  res.json({ msg: 'item added' });
});

router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  DELETE FROM items WHERE items.id = ?
    `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

module.exports = router;
