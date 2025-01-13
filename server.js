// server.js
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require('./routes/auth.routes');

const { cargarDatosCSV } = require('./services/dataLoader');
// Importamos el index.js de models para sincronizar la BD
const { sequelize } = require('./models');

// Importamos nuestras rutas
const pueblosRoutes = require('./routes/pueblos.routes');
const userRoutes = require('./routes/user.routes');
const distanciasRoutes = require('./routes/distancias.routes');
const costosRoutes = require('./routes/costosCasetas.routes');
const calificacionesRoutes = require('./routes/calificaciones.routes');

// (Opcional) Si tienes rutas para el algoritmo:
const algoritmoRoutes = require('./routes/algoritmo.routes');

// Asignamos las rutas a un path base
app.use('/api/auth', authRoutes);
app.use('/api/pueblos', pueblosRoutes);
app.use('/api/users', userRoutes);
app.use('/api/distancias', distanciasRoutes);
app.use('/api/costos', costosRoutes);
app.use('/api/calificaciones', calificacionesRoutes);

// Si tienes el endpoint de algoritmo, lo montas así:
app.use('/api/algoritmo', algoritmoRoutes);

/**
 * Función principal de inicialización.
 * 1) Verifica la conexión con la base de datos
 * 2) Carga los CSV
 * 3) Sincroniza la base de datos
 * 4) Arranca el servidor
 */
async function init() {
  try {
    // 1. Verificar la conexión con la base de datos
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos en Azure');

    // 2. Cargar los CSV (distancias libres, cuota, costos)
    await cargarDatosCSV();
    console.log('CSV cargados correctamente');

    // 3. Sincronizar con la BD (Sequelize)
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la BD');

    // 4. Iniciar el servidor dinámico para Render
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
}

// Llamamos a init() para que haga todo
init();
