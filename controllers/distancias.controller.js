// controllers/distancias.controller.js
const { DistanciaLibre, DistanciaCuota } = require('../models');

// ***** DISTANCIAS LIBRES *****

// 1. Obtener todas las distancias libres
exports.getAllDistanciasLibres = async (req, res) => {
  try {
    const distancias = await DistanciaLibre.findAll();
    res.json(distancias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener distancias libres' });
  }
};

// 2. Obtener distancia libre por ID
exports.getDistanciaLibreById = async (req, res) => {
  try {
    const { id } = req.params;
    const dist = await DistanciaLibre.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia libre no encontrada' });
    }
    res.json(dist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la distancia libre' });
  }
};

// 3. Crear distancia libre
exports.createDistanciaLibre = async (req, res) => {
  try {
    const { pueblo_origen, pueblo_destino, distancia_km } = req.body;
    const nueva = await DistanciaLibre.create({ pueblo_origen, pueblo_destino, distancia_km });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la distancia libre' });
  }
};

// 4. Actualizar distancia libre
exports.updateDistanciaLibre = async (req, res) => {
  try {
    const { id } = req.params;
    const { pueblo_origen, pueblo_destino, distancia_km } = req.body;

    const dist = await DistanciaLibre.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia libre no encontrada' });
    }

    dist.pueblo_origen = pueblo_origen;
    dist.pueblo_destino = pueblo_destino;
    dist.distancia_km = distancia_km;
    await dist.save();

    res.json(dist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la distancia libre' });
  }
};

// 5. Eliminar distancia libre
exports.deleteDistanciaLibre = async (req, res) => {
  try {
    const { id } = req.params;
    const dist = await DistanciaLibre.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia libre no encontrada' });
    }
    await dist.destroy();
    res.json({ message: 'Distancia libre eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la distancia libre' });
  }
};


// ***** DISTANCIAS CUOTA *****
// Puedes repetir el mismo patrón

exports.getAllDistanciasCuota = async (req, res) => {
  try {
    const distancias = await DistanciaCuota.findAll();
    res.json(distancias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener distancias de cuota' });
  }
};

exports.getDistanciaCuotaById = async (req, res) => {
  try {
    const { id } = req.params;
    const dist = await DistanciaCuota.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia de cuota no encontrada' });
    }
    res.json(dist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la distancia de cuota' });
  }
};

exports.createDistanciaCuota = async (req, res) => {
  try {
    const { pueblo_origen, pueblo_destino, distancia_km } = req.body;
    const nueva = await DistanciaCuota.create({ pueblo_origen, pueblo_destino, distancia_km });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la distancia de cuota' });
  }
};

exports.updateDistanciaCuota = async (req, res) => {
  try {
    const { id } = req.params;
    const { pueblo_origen, pueblo_destino, distancia_km } = req.body;

    const dist = await DistanciaCuota.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia de cuota no encontrada' });
    }

    dist.pueblo_origen = pueblo_origen;
    dist.pueblo_destino = pueblo_destino;
    dist.distancia_km = distancia_km;
    await dist.save();

    res.json(dist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la distancia de cuota' });
  }
};

exports.deleteDistanciaCuota = async (req, res) => {
  try {
    const { id } = req.params;
    const dist = await DistanciaCuota.findByPk(id);
    if (!dist) {
      return res.status(404).json({ error: 'Distancia de cuota no encontrada' });
    }
    await dist.destroy();
    res.json({ message: 'Distancia de cuota eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la distancia de cuota' });
  }
};
