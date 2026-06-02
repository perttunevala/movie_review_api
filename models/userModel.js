const db = require('../config/db');

const findByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const create = async (username, passwordHash) => {
  const [result] = await db.query(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)',
    [username, passwordHash]
  );

  return result.insertId;
};

module.exports = {
  findByUsername,
  create
};
