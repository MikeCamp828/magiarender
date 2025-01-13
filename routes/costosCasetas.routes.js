// routes/costosCasetas.routes.js
const express = require('express');
const router = express.Router();
const costosController = require('../controllers/costosCasetas.controller');

// GET /api/costos
router.get('/', costosController.getAllCostos);

// GET /api/costos/:id
router.get('/:id', costosController.getCostoById);

// POST /api/costos
router.post('/', costosController.createCosto);

// PUT /api/costos/:id
router.put('/:id', costosController.updateCosto);

// DELETE /api/costos/:id
router.delete('/:id', costosController.deleteCosto);

module.exports = router;
