const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rutas de autenticación
router.post('/register', authController.register); // Registro de usuario
router.post('/login', authController.login);       // Inicio de sesión

// Rutas relacionadas con calificaciones
router.get('/pueblos', authController.getPueblos); // Obtener lista de pueblos
router.post('/calificacion', authController.addCalificacion); // Agregar una calificación
router.get('/calificacion/:pueblo_id', authController.getCalificacionesByPueblo); // Obtener calificaciones por pueblo

module.exports = router;
