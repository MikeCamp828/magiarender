const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificaciones.controller');
console.log('Controlador cargado:', calificacionesController);

// Ruta para crear una calificación
router.post('/calificacion', calificacionesController.crearCalificacion);

// Ruta para obtener calificaciones por pueblo
router.get('/calificacion/:pueblo_id', calificacionesController.obtenerCalificacionesPorPueblo);

module.exports = router;
