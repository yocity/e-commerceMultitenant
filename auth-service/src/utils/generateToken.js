// src/utils/generateToken.js
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT avec id et email
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = generateToken;
