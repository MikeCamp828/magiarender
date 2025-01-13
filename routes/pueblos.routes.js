// routes/pueblos.routes.js
const express = require('express');
const router = express.Router();
// Importamos nuestro controlador
const pueblosController = require('../controllers/pueblos.controller');

// Definimos las rutas

// GET /api/pueblos
router.get('/', pueblosController.getAllPueblos);

// GET /api/pueblos/:id
router.get('/:id', pueblosController.getPuebloById);

// POST /api/pueblos
router.post('/', pueblosController.createPueblo);

// PUT /api/pueblos/:id
router.put('/:id', pueblosController.updatePueblo);

// DELETE /api/pueblos/:id
router.delete('/:id', pueblosController.deletePueblo);

// Exportamos el router
module.exports = router;
