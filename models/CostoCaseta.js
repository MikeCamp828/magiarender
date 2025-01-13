module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CostoCaseta', {
      costo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pueblo_origen: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pueblos', // Nombre de la tabla
          key: 'pueblo_id',
        },
        allowNull: false,
      },
      pueblo_destino: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pueblos', // Nombre de la tabla
          key: 'pueblo_id',
        },
        allowNull: false,
      },
      costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      tableName: 'costos_casetas',
      timestamps: false,
    });
  };
  