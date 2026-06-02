const db = require('../config/db');

const findAll = async () => {
  const [rows] = await db.query(
    `SELECT r.review_id, r.user_id, r.movie_id, u.username, m.title,
            r.review_date, r.rating, r.comment
     FROM reviews r
     JOIN users u ON r.user_id = u.user_id
     JOIN movies m ON r.movie_id = m.movie_id
     ORDER BY r.review_id`
  );

  return rows;
};

const findById = async (reviewId) => {
  const [rows] = await db.query('SELECT * FROM reviews WHERE review_id = ?', [reviewId]);
  return rows[0];
};

const create = async ({ user_id, movie_id, rating, comment }) => {
  const [result] = await db.query(
    `INSERT INTO reviews (user_id, movie_id, review_date, rating, comment)
     VALUES (?, ?, CURDATE(), ?, ?)`,
    [user_id, movie_id, rating, comment]
  );

  return result.insertId;
};

const update = async (reviewId, { rating, comment }) => {
  const [result] = await db.query(
    'UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?',
    [rating, comment, reviewId]
  );

  return result.affectedRows;
};

const remove = async (reviewId) => {
  const [result] = await db.query('DELETE FROM reviews WHERE review_id = ?', [reviewId]);
  return result.affectedRows;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
