import jwt from 'jsonwebtoken';

// Middleware pour protéger les routes
export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Récupération du token depuis l'en-tête
      token = req.headers.authorization.split(' ')[1];

      // Vérification et décodage du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter les informations de l'utilisateur à la requête
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
