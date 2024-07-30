// src/user-service/services/user.service.js
const User = require('./models.js');

// Méthode pour créer un nouvel utilisateur
const createUser = async (userData) => {
  const { username, email, password } = userData;
  return await User.create({ username, email, password });
};

// Méthode pour vérifier si un utilisateur existe déjà
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
};
