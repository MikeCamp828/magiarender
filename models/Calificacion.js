module.exports = (sequelize, DataTypes) => {
  const Calificacion = sequelize.define('Calificacion', {
    calificacion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pueblo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'calificaciones',
    timestamps: false,
  });

  Calificacion.associate = (models) => {
    Calificacion.belongsTo(models.Pueblo, { foreignKey: 'pueblo_id' });
    Calificacion.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Calificacion;
};
