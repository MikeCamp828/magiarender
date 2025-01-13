module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RutaUsuario', {
      ruta_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users', // Nombre de la tabla
          key: 'user_id',
        },
        allowNull: false,
      },
      nombre_ruta: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      secuencia_pueblos: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'rutas_usuario',
      timestamps: false,
    });
  };
  