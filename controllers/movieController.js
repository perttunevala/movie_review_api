const movieModel = require('../models/movieModel');

const getMovieInputError = ({ title, genre, release_year }) => {
  const year = Number(release_year);
  const currentYear = new Date().getFullYear() + 1;

  if (!title || title.trim().length < 2) {
    return 'Elokuvan nimessa pitaa olla vahintaan kaksi merkkia';
  }

  if (!genre || genre.trim().length < 2) {
    return 'Genren pitaa olla vahintaan kaksi merkkia';
  }

  if (!Number.isInteger(year) || year < 1888 || year > currentYear) {
    return `Julkaisuvuoden pitaa olla valilta 1888-${currentYear}`;
  }

  return null;
};

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
  const inputError = getMovieInputError({ title, genre, release_year });

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  try {
    const movieId = await movieModel.create({
      title: title.trim(),
      genre: genre.trim(),
      release_year: Number(release_year)
    });
    const movie = await movieModel.findById(movieId);

    return res.status(201).json(movie);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create movie' });
  }
};

const updateMovie = async (req, res) => {
  const { title, genre, release_year } = req.body;
  const inputError = getMovieInputError({ title, genre, release_year });

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  try {
    const affectedRows = await movieModel.update(req.params.id, {
      title: title.trim(),
      genre: genre.trim(),
      release_year: Number(release_year)
    });

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
