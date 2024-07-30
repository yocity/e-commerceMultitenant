const express = require('express');
const bodyParser = require('body-parser');
const { getDatabaseConnection } = require('./models');

const app = express();
app.use(bodyParser.json());

// Route pour créer un utilisateur dans un tenant spécifique
app.post('/users', async (req, res) => {
  const tenantName = req.headers['x-tenant-name'];
  const { name } = req.body;

  if (!tenantName || !name) return res.status(400).send('Tenant name and user name are required');

  try {
    const { sequelize, User } = getDatabaseConnection(tenantName);
    await sequelize.sync();
    await User.create({ name });
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
});

// Route pour récupérer les utilisateurs d'un tenant spécifique
app.get('/users', async (req, res) => {
  const tenantName = req.headers['x-tenant-name'];

  if (!tenantName) return res.status(400).send('Tenant name is required');

  try {
    const { sequelize, User } = getDatabaseConnection(tenantName);
    await sequelize.sync();
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`Error retrieving users: ${error.message}`);
  }
});

// Démarrer le serveur
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});
