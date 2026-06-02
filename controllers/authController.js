const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  const cleanUsername = username ? username.trim().toLowerCase() : '';

  if (!cleanUsername || cleanUsername.length < 3) {
    return res.status(400).json({ message: 'Kayttajatunnuksessa pitaa olla vahintaan kolme merkkia' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Salasanassa pitaa olla vahintaan kahdeksan merkkia' });
  }

  try {
    const existingUser = await userModel.findByUsername(cleanUsername);

    if (existingUser) {
      return res.status(409).json({ message: 'Kayttajatunnus on jo kaytossa' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await userModel.create(cleanUsername, passwordHash);

    return res.status(201).json({
      message: 'Kayttaja rekisteroity',
      user: {
        id: userId,
        username: cleanUsername
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Register failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const cleanUsername = username ? username.trim().toLowerCase() : '';

  if (!cleanUsername || !password) {
    return res.status(400).json({ message: 'Kayttajatunnus ja salasana tarvitaan' });
  }

  try {
    const user = await userModel.findByUsername(cleanUsername);

    if (!user) {
      return res.status(401).json({ message: 'Kirjautumistiedot eivat taysmanneet' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Kirjautumistiedot eivat tasmanneet' });
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Kirjautuminen onnistui',
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = {
  register,
  login
};
