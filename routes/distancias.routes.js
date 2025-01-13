// routes/distancias.routes.js
const express = require('express');
const router = express.Router();
const distanciasController = require('../controllers/distancias.controller');

// ***** RUTAS PARA DISTANCIAS LIBRES *****
router.get('/libre', distanciasController.getAllDistanciasLibres);
router.get('/libre/:id', distanciasController.getDistanciaLibreById);
router.post('/libre', distanciasController.createDistanciaLibre);
router.put('/libre/:id', distanciasController.updateDistanciaLibre);
router.delete('/libre/:id', distanciasController.deleteDistanciaLibre);

// ***** RUTAS PARA DISTANCIAS DE CUOTA *****
router.get('/cuota', distanciasController.getAllDistanciasCuota);
router.get('/cuota/:id', distanciasController.getDistanciaCuotaById);
router.post('/cuota', distanciasController.createDistanciaCuota);
router.put('/cuota/:id', distanciasController.updateDistanciaCuota);
router.delete('/cuota/:id', distanciasController.deleteDistanciaCuota);

module.exports = router;
