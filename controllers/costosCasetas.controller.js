// controllers/costosCasetas.controller.js
const { CostosCasetas } = require('../models');

// Obtener todos los costos
exports.getAllCostos = async (req, res) => {
  try {
    const costos = await CostosCasetas.findAll();
    res.json(costos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los costos de casetas' });
  }
};

// Obtener un costo por ID
exports.getCostoById = async (req, res) => {
  try {
    const { id } = req.params;
    const costo = await CostosCasetas.findByPk(id);
    if (!costo) {
      return res.status(404).json({ error: 'Costo de caseta no encontrado' });
    }
    res.json(costo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el costo de caseta' });
  }
};

// Crear un costo de caseta
exports.createCosto = async (req, res) => {
  try {
    const { pueblo_origen, pueblo_destino, costo } = req.body;
    const nuevoCosto = await CostosCasetas.create({ pueblo_origen, pueblo_destino, costo });
    res.status(201).json(nuevoCosto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el costo de caseta' });
  }
};

// Actualizar un costo de caseta
exports.updateCosto = async (req, res) => {
  try {
    const { id } = req.params;
    const { pueblo_origen, pueblo_destino, costo } = req.body;

    const registro = await CostosCasetas.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Costo de caseta no encontrado' });
    }

    registro.pueblo_origen = pueblo_origen;
    registro.pueblo_destino = pueblo_destino;
    registro.costo = costo;
    await registro.save();

    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el costo de caseta' });
  }
};

// Eliminar un costo de caseta
exports.deleteCosto = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await CostosCasetas.findByPk(id);
    if (!registro) {
      return res.status(404).json({ error: 'Costo de caseta no encontrado' });
    }
    await registro.destroy();
    res.json({ message: 'Costo de caseta eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el costo de caseta' });
  }
};
