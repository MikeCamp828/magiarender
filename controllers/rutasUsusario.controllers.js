// controllers/rutasUsuario.controller.js
const { RutasUsuario } = require('../models'); // ejemplo de un modelo

exports.getAllRutasDelUsuario = async (req, res) => {
  try {
    // Gracias a verifyToken, tenemos: req.user = { user_id, email }
    const userId = req.user.user_id;

    // Buscar en la BD solo las rutas de ese usuario
    const rutas = await RutasUsuario.findAll({
      where: { user_id: userId }
    });
    res.json(rutas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener rutas del usuario' });
  }
};
