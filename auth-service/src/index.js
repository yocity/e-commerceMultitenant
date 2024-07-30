// src/auth-service/server.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes.js');

dotenv.config();

const app = express();

// Middleware pour parser le JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Routes d'authentification
app.use('/api/auth', authRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
