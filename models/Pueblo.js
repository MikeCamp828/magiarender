module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pueblo', {
      pueblo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lat: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      lng: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
    }, {
      tableName: 'pueblos', // Asegúrate de que coincide con el nombre exacto de la tabla
      timestamps: false,
    });
  };
  