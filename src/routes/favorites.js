const express = require('express');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT favorites.id AS 'favorite_id', favorites.user_id, items.id AS 'item_id', items.title, items.description, items.city, items.price, items.item_condition, items.image, items.post_timestamp, categories.id AS 'category_id', category
  FROM favorites
  INNER JOIN items
  ON items.id = favorites.favorite_item
  INNER JOIN categories
  ON items.category_id = categories.id

  WHERE favorites.user_id = ?

    `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

router.post('/', async (req, res) => {
  const { user_id, favorite_item } = req.body;
  const sql1 = `
  SELECT * FROM favorites
  WHERE favorites.favorite_item = ?`;
  const dbResult1 = await dbAction(sql1, [favorite_item]);

  if (dbResult1.length === 0) {
    const sql = `INSERT INTO favorites (user_id, favorite_item) VALUES (?, ?)`;
    const dbResult = await dbAction(sql, [user_id, favorite_item]);
    if (dbResult === false) {
      return res.status(500).json({ error: 'something went wrong' });
    }
    res.json({ msg: 'favorite added' });
  } else {
    const sql2 = `DELETE FROM favorites where favorites.favorite_item = ?`;
    const dbResult2 = await dbAction(sql2, [favorite_item]);
    if (dbResult2 === false) {
      return res.status(500).json({ error: 'something went wrong' });
    }
    res.json({ msg: 'favorite removed' });
  }
});

module.exports = router;
