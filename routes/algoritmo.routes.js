// routes/algoritmo.routes.js
const express = require('express');
const router = express.Router();

const algoritmoCtrl = require('../controllers/algoritmo.controller');

// POST /api/algoritmo/ruta-optima
router.post('/ruta-optima', algoritmoCtrl.obtenerRutaOptima);

module.exports = router;
