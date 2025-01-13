// controllers/algoritmo.controller.js
const { calcularRutaOptima } = require('../services/algoritmoGenetico');
const {
  getDistanciasLibresDic,
  getDistanciasCuotaDic,
  getCostosCasetasDic
} = require('../services/dataLoader');

exports.obtenerRutaOptima = (req, res) => {
  try {
    const {
      listaPueblos,   // array de IDs (por ejemplo [2,3,4])
      tipoRuta,       // "libre" o "cuota"
      startPueblo,    // ID del pueblo de inicio
      populationSize, // número
      generations,    // número
      mutationRate    // 0.xx
    } = req.body;

    // Elegir la matriz de distancias según tipoRuta
    let distancias;
    if (tipoRuta === 'libre') {
      distancias = getDistanciasLibresDic();
    } else {
      distancias = getDistanciasCuotaDic();
    }

    // Matriz de costos (si la quieres usar)
    const costos = getCostosCasetasDic();

    // Llamar al GA
    const resultado = calcularRutaOptima({
      listaPueblos,
      tipoRuta,
      startPueblo,
      distancias,
      costos,
      populationSize: parseInt(populationSize, 10) || 50,
      generations: parseInt(generations, 10) || 200,
      mutationRate: parseFloat(mutationRate) || 0.1
    });

    res.json({
      mejorRuta: resultado.mejorRuta,
      distanciaTotal: resultado.distanciaTotal
    });
  } catch (error) {
    console.error('Error en obtenerRutaOptima:', error);
    res.status(500).json({ error: 'Error al calcular la ruta óptima' });
  }
};
