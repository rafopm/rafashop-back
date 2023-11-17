const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authMiddleware = async (req, res, next) => {
  // Obtener el token de la cabecera de la solicitud
  const token = req.headers.authorization?.split(' ')[1]; // Usamos el operador ? para evitar errores si no hay cabecera Authorization

  try {
    // Verificar si el token es válido
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Buscar al usuario correspondiente al ID del token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // Añadir el usuario a la solicitud
    req.user = user;
    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;