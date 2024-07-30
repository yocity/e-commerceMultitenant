// src/auth-service/routes/auth.routes.js
const express = require('express');
const { register, login, logout } = require('./controller.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);  // Ajout de la route de déconnexion

module.exports = router;
