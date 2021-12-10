const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const dbGetAction = async (sql, data = []) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, data);
    await conn.end();
    return Array.isArray(result) && result.length === 1 ? result[0] : result;
  } catch (error) {
    console.log('dbGetAction error ', error.message);
    return false;
  }
};

const dbFail = (res, errorText, statusCode = 500) => {
  return res.status(statusCode).send({ error: errorText });
};

const dbSuccess = (res, result, statusCode = 200) => {
  res.status(statusCode).send({ msg: 'success', data: result });
};

module.exports = {
  dbGetAction,
  dbFail,
  dbSuccess,
};
