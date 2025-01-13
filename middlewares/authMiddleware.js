// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  try {
    // 1. Obtener el token del encabezado "Authorization"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // 2. El token normalmente viene como "Bearer <token>", hay que separarlo
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // 3. Verificar el token con la secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Añadir la info decodificada al request (p.ej. req.user)
    req.user = {
      user_id: decoded.user_id,
      email: decoded.email
    };

    // 5. Pasamos al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
