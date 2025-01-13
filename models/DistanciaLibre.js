module.exports = (sequelize, DataTypes) => {
    return sequelize.define('DistanciaLibre', {
      distancia_libre_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pueblo_origen: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pueblos', // Aquí indicamos el nombre de la tabla (no el modelo directamente)
          key: 'pueblo_id',
        },
        allowNull: false,
      },
      pueblo_destino: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pueblos', // Aquí indicamos el nombre de la tabla (no el modelo directamente)
          key: 'pueblo_id',
        },
        allowNull: false,
      },
      distancia_km: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      tableName: 'distancias_libre',
      timestamps: false, // Evitamos que Sequelize agregue createdAt y updatedAt
    });
  };
  