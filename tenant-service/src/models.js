const { Sequelize, DataTypes } = require('sequelize');

// Configurer la connexion à la base de données MySQL
const sequelize = new Sequelize('main_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Désactiver les logs SQL pour une sortie plus propre
});

// Définir les modèles
const Tenant = sequelize.define('Tenant', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  timestamps: true,
});

// Synchroniser les modèles avec la base de données
sequelize.sync();

module.exports = { sequelize, Tenant };
