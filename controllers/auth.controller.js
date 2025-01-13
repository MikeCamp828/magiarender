const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Calificacion, Pueblo } = require('../models'); // Incluye los modelos necesarios
require('dotenv').config(); // Para leer process.env.JWT_SECRET, etc.

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const userExistente = await User.findOne({ where: { email } });
    if (userExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      user_id: newUser.user_id,
      email: newUser.email
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '1h' }
    );

    res.json({ 
      message: 'Login exitoso',
      token 
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener todos los pueblos
exports.getPueblos = async (req, res) => {
  try {
    const pueblos = await Pueblo.findAll();
    res.json(pueblos);
  } catch (error) {
    console.error('Error al obtener los pueblos:', error);
    res.status(500).json({ error: 'Error al obtener los pueblos' });
  }
};

// Agregar calificación
exports.addCalificacion = async (req, res) => {
  try {
    const { user_id, pueblo_id, rating, comentario } = req.body;

    // Verifica que el pueblo existe
    const pueblo = await Pueblo.findByPk(pueblo_id);
    if (!pueblo) {
      return res.status(404).json({ error: 'Pueblo no encontrado' });
    }

       // Crear la calificación
       const nuevaCalificacion = await Calificacion.create({
        user_id,
        pueblo_id,
        rating,
        comentario,
    });

    res.status(201).json({
        message: 'Calificación agregada exitosamente',
        calificacion: nuevaCalificacion,
    });
} catch (error) {
    console.error('Error agregando calificación:', error);
    res.status(500).json({ error: 'Error al agregar la calificación' });
}
};
// Obtener calificaciones por pueblo
exports.getCalificacionesByPueblo = async (req, res) => {
  try {
    const { pueblo_id } = req.params;

    const calificaciones = await Calificacion.findAll({
      where: { pueblo_id },
      include: [{ model: User, attributes: ['nombre'] }], // Incluye el nombre del usuario
    });

    res.json(calificaciones);
  } catch (error) {
    console.error('Error al obtener calificaciones:', error);
    res.status(500).json({ error: 'Error al obtener calificaciones' });
  }
};
