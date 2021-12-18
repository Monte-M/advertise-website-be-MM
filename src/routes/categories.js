const express = require('express');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const router = express.Router();

// GET /categories/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT items.category_id, categories.category, items.id, items.title, items.description,items.city, items.price, items.item_condition, items.image, items.post_timestamp, items.user_id
  FROM categories
  INNER JOIN items
  ON items.category_id = categories.id
  WHERE categories.id = ?
    `;
  const dbResult = await dbAction(sql, [id]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// // GET all categories
router.get('/', async (req, res) => {
  const dbResult = await dbAction(`
  SELECT * FROM categories
`);
  if (dbResult === false) {
    return dbFail(res, 'error getting categories');
  }
  return dbSuccess(res, dbResult);
});

module.exports = router;
