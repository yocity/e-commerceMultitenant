const express = require('express');
const bodyParser = require('body-parser');
const { createTenant, getAllTenants } = require('./database');

const app = express();
app.use(bodyParser.json());

// Route pour créer un tenant
app.post('/', async (req, res) => {
  const tenantName = req.body.name;
  if (!tenantName) return res.status(400).send('Tenant name is required');

  try {
    await createTenant(tenantName);
    res.status(201).send(`Tenant ${tenantName} created successfully`);
  } catch (error) {
    res.status(500).send(`Error creating tenant: ${error.message}`);
  }
});

// Route pour récupérer tous les tenants
app.get('/', async (req, res) => {
  try {
    const tenants = await getAllTenants();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).send(`Error retrieving tenants: ${error.message}`);
  }
});

// Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Tenant service is running on port ${PORT}`);
});
