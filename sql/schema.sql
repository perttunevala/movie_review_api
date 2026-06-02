CREATE DATABASE IF NOT EXISTS movie_review_db;
USE movie_review_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  movie_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100) NOT NULL,
  release_year INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  review_date DATE NOT NULL,
  rating INT NOT NULL,
  comment TEXT NOT NULL,
  CONSTRAINT fk_reviews_users
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_reviews_movies
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

DROP PROCEDURE IF EXISTS GetMovieReviews;

DELIMITER //

CREATE PROCEDURE GetMovieReviews(IN movieId INT)
BEGIN
  SELECT m.title, u.username, r.rating, r.comment, r.review_date
  FROM reviews r
  JOIN movies m ON r.movie_id = m.movie_id
  JOIN users u ON r.user_id = u.user_id
  WHERE r.movie_id = movieId
  ORDER BY r.review_date DESC, r.review_id DESC;
END //

DELIMITER ;
