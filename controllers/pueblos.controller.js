// controllers/pueblos.controller.js
const { Pueblo } = require('../models'); 
// ^ Asumiendo que en models/index.js exportas Pueblo

// 1) Obtener todos los pueblos
exports.getAllPueblos = async (req, res) => {
  try {
    const pueblos = await Pueblo.findAll(); 
    res.json(pueblos); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de pueblos' });
  }
};

// 2) Obtener un pueblo por ID
exports.getPuebloById = async (req, res) => {
  try {
    const { id } = req.params; 
    const pueblo = await Pueblo.findByPk(id); // findByPk = buscar por Primary Key
    if (!pueblo) {
      return res.status(404).json({ error: 'Pueblo no encontrado' });
    }
    res.json(pueblo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pueblo' });
  }
};

// 3) Crear un nuevo pueblo
exports.createPueblo = async (req, res) => {
  try {
    // req.body debe traer { nombre, descripcion, lat, lng } o lo que requieras
    const { nombre, descripcion, lat, lng } = req.body;
    const nuevoPueblo = await Pueblo.create({ nombre, descripcion, lat, lng });
    res.status(201).json(nuevoPueblo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un nuevo pueblo' });
  }
};

// 4) Actualizar un pueblo existente
exports.updatePueblo = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nombre, descripcion, lat, lng } = req.body;
    const pueblo = await Pueblo.findByPk(id);
    if (!pueblo) {
      return res.status(404).json({ error: 'Pueblo no encontrado' });
    }
    // Actualizamos solo los campos que nos interesan
    pueblo.nombre = nombre;
    pueblo.descripcion = descripcion;
    pueblo.lat = lat;
    pueblo.lng = lng;
    await pueblo.save();

    res.json(pueblo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pueblo' });
  }
};

// 5) Eliminar un pueblo
exports.deletePueblo = async (req, res) => {
  try {
    const { id } = req.params;
    const pueblo = await Pueblo.findByPk(id);
    if (!pueblo) {
      return res.status(404).json({ error: 'Pueblo no encontrado' });
    }
    await pueblo.destroy();
    res.json({ message: 'Pueblo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pueblo' });
  }
};
