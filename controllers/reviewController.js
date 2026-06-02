const reviewModel = require('../models/reviewModel');
const movieModel = require('../models/movieModel');

const getReviewInputError = ({ movie_id, rating, comment }, requireMovie = true) => {
  const movieId = Number(movie_id);
  const stars = Number(rating);

  if (requireMovie && (!Number.isInteger(movieId) || movieId < 1)) {
    return 'Valitse arvostelulle olemassa oleva elokuva';
  }

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return 'Arvosanan pitaa olla kokonaisluku valilta 1-5';
  }

  if (!comment || comment.trim().length < 3) {
    return 'Kommentin pitaa olla vahintaan kolme merkkia';
  }

  return null;
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch reviews' });
  }
};

const createReview = async (req, res) => {
  const { movie_id, rating, comment } = req.body;
  const user_id = req.user.id;
  const inputError = getReviewInputError({ movie_id, rating, comment });

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  try {
    const movie = await movieModel.findById(movie_id);

    if (!movie) {
      return res.status(404).json({ message: 'Elokuvaa ei loytynyt' });
    }

    const reviewId = await reviewModel.create({
      user_id,
      movie_id: Number(movie_id),
      rating: Number(rating),
      comment: comment.trim()
    });
    const review = await reviewModel.findById(reviewId);

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create review' });
  }
};

const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const inputError = getReviewInputError({ rating, comment }, false);

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  try {
    const review = await reviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Arvostelua ei loytynyt' });
    }

    const affectedRows = await reviewModel.update(req.params.id, req.user.id, {
      rating: Number(rating),
      comment: comment.trim()
    });

    if (!affectedRows) {
      return res.status(403).json({ message: 'Voit muokata vain omia arvostelujasi' });
    }

    const updatedReview = await reviewModel.findById(req.params.id);
    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ message: 'Could not update review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Arvostelua ei loytynyt' });
    }

    const affectedRows = await reviewModel.remove(req.params.id, req.user.id);

    if (!affectedRows) {
      return res.status(403).json({ message: 'Voit poistaa vain omia arvostelujasi' });
    }

    return res.status(200).json({ message: 'Arvostelu poistettu' });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete review' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
};
