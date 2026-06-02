const db = require('../config/db');

const findAll = async () => {
  const [rows] = await db.query('SELECT * FROM movies ORDER BY movie_id');
  return rows;
};

const findById = async (movieId) => {
  const [rows] = await db.query('SELECT * FROM movies WHERE movie_id = ?', [movieId]);
  return rows[0];
};

const create = async ({ title, genre, release_year }) => {
  const [result] = await db.query(
    'INSERT INTO movies (title, genre, release_year) VALUES (?, ?, ?)',
    [title, genre, release_year]
  );

  return result.insertId;
};

const update = async (movieId, { title, genre, release_year }) => {
  const [result] = await db.query(
    'UPDATE movies SET title = ?, genre = ?, release_year = ? WHERE movie_id = ?',
    [title, genre, release_year, movieId]
  );

  return result.affectedRows;
};

const remove = async (movieId) => {
  const [result] = await db.query('DELETE FROM movies WHERE movie_id = ?', [movieId]);
  return result.affectedRows;
};

const getReviews = async (movieId) => {
  const [rows] = await db.query('CALL GetMovieReviews(?)', [movieId]);
  return rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  getReviews
};
