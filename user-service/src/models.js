const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

// Fonction pour obtenir une instance Sequelize pour un tenant spécifique
const getSequelizeInstance = (databaseName) => {
  return new Sequelize(databaseName, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
};

// Fonction pour définir les modèles
const defineModels = (sequelize) => {
  // Définition du modèle utilisateur
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hachage du mot de passe avant l'enregistrement
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Méthode pour comparer les mots de passe
  User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  return { User };
};

// Fonction pour obtenir une connexion à la base de données
const getDatabaseConnection = (tenantName) => {
  const sequelize = getSequelizeInstance(tenantName);
  const models = defineModels(sequelize);

  // Synchroniser les modèles avec la base de données (à faire uniquement en développement)
  sequelize.sync({ alter: true })
    .then(() => console.log(`Database & tables created for tenant: ${tenantName}`))
    .catch(err => console.error('Error syncing database:', err));

  return { sequelize, ...models };
};

module.exports = { getDatabaseConnection };
