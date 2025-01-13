// config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // pueblos_magicos_db
  process.env.DB_USER, // admin8285
  process.env.DB_PASSWORD, // tu contraseña
  {
    host: process.env.DB_HOST, // 8285magicos.postgres.database.azure.com
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Asegura la conexión SSL
      },
    },
  }
);

module.exports = sequelize;
