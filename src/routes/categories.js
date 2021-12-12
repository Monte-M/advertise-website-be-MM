const express = require('express');

const { dbAction, dbFail, dbSuccess } = require('../utils/dbHelper');
const router = express.Router();

// GET /categories/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return dbFail(res, 'bad input', 400);
  const sql = `
  SELECT * FROM categories
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
    return dbFail(res, 'error getting items');
  }
  return dbSuccess(res, dbResult);
});

module.exports = router;
