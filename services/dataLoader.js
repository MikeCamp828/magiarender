// services/dataLoader.js
const { leerCSV, convertirMatrizDistancias } = require('../utils/csvUtils');

let distanciasLibresDic = {};
let distanciasCuotaDic = {};
let costosCasetasDic = {};

/**
 * Carga los 3 CSV al arrancar la app y los convierte a diccionarios globales.
 */
async function cargarDatosCSV() {
  // 1) Distancias libres
  const libreData = await leerCSV('data/distancias_libre.csv');
  distanciasLibresDic = convertirMatrizDistancias(libreData);
  console.log("Diccionario de distancias libres:", distanciasLibresDic);

  // 2) Distancias cuota
  const cuotaData = await leerCSV('data/distancias_cuota.csv');
  distanciasCuotaDic = convertirMatrizDistancias(cuotaData);
  console.log("Diccionario de distancias cuota:", distanciasCuotaDic);

  // 3) Costos casetas
  const casetasData = await leerCSV('data/costos_casetas.csv');
  costosCasetasDic = convertirMatrizDistancias(casetasData);
  console.log("Diccionario de costos casetas:", costosCasetasDic);

  console.log('>>> CSV cargados y convertidos correctamente.');
}

/**
 * Getters para que otros módulos obtengan los diccionarios
 */
function getDistanciasLibresDic() {
  return distanciasLibresDic;
}
function getDistanciasCuotaDic() {
  return distanciasCuotaDic;
}
function getCostosCasetasDic() {
  return costosCasetasDic;
}

module.exports = {
  cargarDatosCSV,
  getDistanciasLibresDic,
  getDistanciasCuotaDic,
  getCostosCasetasDic
};
