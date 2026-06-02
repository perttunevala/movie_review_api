const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await userModel.findByUsername(username);

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await userModel.create(username, passwordHash);

    return res.status(201).json({
      message: 'User registered',
      user: {
        id: userId,
        username
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Register failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await userModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
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
