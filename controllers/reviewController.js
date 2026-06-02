const reviewModel = require('../models/reviewModel');

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

  if (!movie_id || !rating || !comment) {
    return res.status(400).json({ message: 'movie_id, rating and comment are required' });
  }

  try {
    const reviewId = await reviewModel.create({ user_id, movie_id, rating, comment });
    const review = await reviewModel.findById(reviewId);

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create review' });
  }
};

const updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: 'rating and comment are required' });
  }

  try {
    const affectedRows = await reviewModel.update(req.params.id, { rating, comment });

    if (!affectedRows) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const review = await reviewModel.findById(req.params.id);
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Could not update review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const affectedRows = await reviewModel.remove(req.params.id);

    if (!affectedRows) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review deleted' });
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
