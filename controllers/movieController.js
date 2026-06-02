const movieModel = require('../models/movieModel');

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch movies' });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch movie' });
  }
};

const createMovie = async (req, res) => {
  const { title, genre, release_year } = req.body;

  if (!title || !genre || !release_year) {
    return res.status(400).json({ message: 'Title, genre and release_year are required' });
  }

  try {
    const movieId = await movieModel.create({ title, genre, release_year });
    const movie = await movieModel.findById(movieId);

    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create movie' });
  }
};

const updateMovie = async (req, res) => {
  const { title, genre, release_year } = req.body;

  if (!title || !genre || !release_year) {
    return res.status(400).json({ message: 'Title, genre and release_year are required' });
  }

  try {
    const affectedRows = await movieModel.update(req.params.id, { title, genre, release_year });

    if (!affectedRows) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = await movieModel.findById(req.params.id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Could not update movie' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const affectedRows = await movieModel.remove(req.params.id);

    if (!affectedRows) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete movie' });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const reviews = await movieModel.getReviews(req.params.id);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch movie reviews' });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieReviews
};
