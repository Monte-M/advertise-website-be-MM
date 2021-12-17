const express = require('express');
const multer = require('multer');
const path = require('path');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const { authenticateToken } = require('../utils/middleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// // GET all items
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT items.id, items.category_id, items.title, items.description, items.city, items.price, items.item_condition, items.image, items.post_timestamp, categories.category, favorites.id AS 'favorite_id', favorites.user_id
  FROM items
  INNER JOIN categories
  ON items.category_id = categories.id
  LEFT JOIN favorites
  ON items.id = favorites.favorite_item && favorites.user_id = ? 
  `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// GET /item/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT items.id, items.title, items.description, items.category_id, items.city, items.price, items.item_condition, items.image, items.post_timestamp, users.id AS 'user_id', users.username, users.email, users.city AS 'user_city', users.phone_number, users.image AS 'user_image', users.reg_timestamp, categories.category
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
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    const sql = `INSERT INTO items (title, user_id, category_id,  description, city, price, item_condition, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const {
      title,
      user_id,
      category_id,
      description,
      city,
      price,
      item_condition,
    } = req.body;
    const image = req.file.filename;

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
    // console.log('req.file', req.file);
    // if (req.file.size >= 500000) {
    //   res.status(400).json({ error: 'Too big' });
    // }
  },
);

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

router.post('/update', authenticateToken, async (req, res) => {
  const sql = `
  UPDATE items 
  SET title = ?, description = ?, city = ?, price = ?
  WHERE items.id = ?`;
  const { title, description, city, price, id } = req.body;
  const dbResult = await dbAction(sql, [title, description, city, price, id]);

  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  res.json({ msg: 'item updated' });
  // console.log('req.file', req.file);
  // if (req.file.size >= 500000) {
  //   res.status(400).json({ error: 'Too big' });
  // }
});

module.exports = router;
