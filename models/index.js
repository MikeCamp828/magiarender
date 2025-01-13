// index.js

// 1) Importamos la instancia de Sequelize desde el archivo db.js
const sequelize = require('../config/db');

// 2) Importamos 'DataTypes' desde 'sequelize'
const { DataTypes } = require('sequelize');

// 3) Importamos los modelos
const User = require('./User')(sequelize, DataTypes);
const Pueblo = require('./Pueblo')(sequelize, DataTypes);
const DistanciaLibre = require('./DistanciaLibre')(sequelize, DataTypes);
const DistanciaCuota = require('./DistanciaCuota')(sequelize, DataTypes);
const CostoCaseta = require('./CostoCaseta')(sequelize, DataTypes);
const RutaUsuario = require('./RutaUsuario')(sequelize, DataTypes);
const Calificacion = require('./Calificacion')(sequelize, DataTypes);

// 4) Agrupamos todos los modelos en un objeto
const models = {
  User,
  Pueblo,
  DistanciaLibre,
  DistanciaCuota,
  CostoCaseta,
  RutaUsuario,
  Calificacion,
};

// 5) Definimos las relaciones usando relaciones.js
const defineRelations = require('./relaciones');
defineRelations(models);

// 6) Exportamos los modelos y la instancia de Sequelize
module.exports = {
  sequelize,
  ...models,
};
