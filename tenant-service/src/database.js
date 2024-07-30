const { Sequelize, DataTypes } = require('sequelize');

// Configuration de la connexion à la base de données principale
const sequelize = new Sequelize('main_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Désactiver les logs de requêtes SQL, optionnel
});

// Définition du modèle Tenant
const Tenant = sequelize.define('Tenant', {
  name: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tenants',
  timestamps: true, // Assure la gestion automatique de createdAt et updatedAt
});

// Fonction pour créer une base de données pour un tenant
const createTenant = async (tenantName) => {
  try {
    // Se connecter à la base de données
    await sequelize.authenticate();

    // Créer la base de données pour le tenant si elle n'existe pas
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${tenantName}\`;`);

    // Synchroniser le modèle Tenant avec la base de données principale
    await Tenant.sync();

    // Ajouter le tenant à la table des tenants
    await Tenant.findOrCreate({
      where: { name: tenantName },
    });

    console.log(`Base de données et tenant "${tenantName}" créés avec succès.`);
  } catch (error) {
    console.error('Erreur lors de la création de la base de données ou du tenant :', error);
  }
};

// Fonction pour obtenir tous les tenants
const getAllTenants = async () => {
  try {
    // Se connecter à la base de données
    await sequelize.authenticate();

    // Récupérer tous les tenants
    const tenants = await Tenant.findAll();

    return tenants.map(tenant => tenant.dataValues); // Retourner les valeurs des tenants
  } catch (error) {
    console.error('Erreur lors de la récupération des tenants :', error);
    return [];
  }
};

// Exporter les fonctions pour une utilisation externe
module.exports = { createTenant, getAllTenants };
