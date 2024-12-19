## Application Multi-Tenant

### Fonctionnalités
- Gestion de plusieurs clients avec isolation des données.
- Authentification et gestion des utilisateurs par tenant.
- Catalogue de produits par tenant.
- Gestion des commandes et paiements spécifiques à chaque tenant.

### Technologies Utilisées
- **Backend** : Expressjs
- **Base de données** : MySQL (avec Sequelize pour l'ORM)
- **Authentification** : JWT (JSON Web Token)

### Lancer le Projet
1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement dans `config/.env`.
4. Démarrez le serveur :
   ```bash
   npm run start
   ```
5. Accédez à l'application sur [http://localhost:3000](http://localhost:3000).
