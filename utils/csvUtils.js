// utils/csvUtils.js
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

/**
 * Lee un archivo CSV y retorna un array de objetos (cada fila = 1 objeto).
 * Ejemplo de fila: { "id": "1", "1": "0", "2": "10", "3": "15", "4": "20" }
 */
function leerCSV(rutaRelativa) {
  return new Promise((resolve, reject) => {
    const resultados = [];
    const absolutePath = path.join(__dirname, '..', rutaRelativa);

    fs.createReadStream(absolutePath)
      .pipe(csvParser())
      .on('data', (data) => {
        resultados.push(data);
      })
      .on('end', () => {
        resolve(resultados);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

/**
 * Convierte el array de objetos (cada fila con id y columnas) en un diccionario:
 * {
 *   "1": { "1": 0, "2": 10, "3": 15, "4": 20 },
 *   "2": { "1": 10, "2": 0,  "3": 35, "4": 25 },
 *   ...
 * }
 */
function convertirMatrizDistancias(arrayCSV) {
  const dic = {};

  arrayCSV.forEach((fila) => {
    const origen = fila.ID?.trim(); // Asegurarse de que 'id' exista y eliminar espacios innecesarios

    if (!origen) {
      console.warn('Fila sin ID detectada:', fila);
      return; // Ignorar filas sin ID
    }

    if (!dic[origen]) {
      dic[origen] = {}; // Inicializar el diccionario para el origen
    }

    for (let destino in fila) {
      if (destino !== 'ID') {
        const distancia = parseFloat(fila[destino]);

        if (!isNaN(distancia)) {
          dic[origen][destino.trim()] = distancia; // Asegúrate de eliminar espacios en los destinos
        } else {
          console.warn(`Distancia inválida para ${origen} -> ${destino}: ${fila[destino]}`);
        }
      }
    }
  });

  console.log("Diccionario de distancias generado correctamente:", dic);
  return dic;
}



module.exports = {
  leerCSV,
  convertirMatrizDistancias
};
