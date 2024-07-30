// src/auth-service/controllers/auth.controller.js
const { createUser, findUserByEmail } = require('../../user-service/src/service.js');
const generateToken = require('./utils/generateToken.js');
const { blacklistToken } = require('./utils/tokenBlacklist.js');

// Contrôleur pour l'inscription
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await createUser({ username, email, password });
    const token = generateToken(user.id, user.email);

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Contrôleur pour la connexion
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user && await user.matchPassword(password)) {
        const token = generateToken(user.id, user.email);
      res.json({
        message: 'Login successful',
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extraire le token du header Authorization
      if (token) {
        blacklistToken(token); // Ajouter le token à la liste noire
      }
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = {
  register,
  login,
  logout,
};
