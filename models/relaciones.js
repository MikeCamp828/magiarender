// relaciones.js

function defineRelations(models) {
    const { 
      User, 
      Pueblo, 
      DistanciaLibre, 
      DistanciaCuota, 
      CostoCaseta, 
      RutaUsuario, 
      Calificacion 
    } = models;
  
    // Relaciones entre User y RutaUsuario
    User.hasMany(RutaUsuario, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    RutaUsuario.belongsTo(User, { foreignKey: 'user_id' });
  
    // Relaciones entre Pueblo y DistanciaLibre
    Pueblo.hasMany(DistanciaLibre, { foreignKey: 'pueblo_origen', as: 'OrigenLibre', onDelete: 'CASCADE' });
    Pueblo.hasMany(DistanciaLibre, { foreignKey: 'pueblo_destino', as: 'DestinoLibre', onDelete: 'CASCADE' });
    DistanciaLibre.belongsTo(Pueblo, { foreignKey: 'pueblo_origen', as: 'OrigenPueblo' });
    DistanciaLibre.belongsTo(Pueblo, { foreignKey: 'pueblo_destino', as: 'DestinoPueblo' });
  
    // Relaciones entre Pueblo y DistanciaCuota
    Pueblo.hasMany(DistanciaCuota, { foreignKey: 'pueblo_origen', as: 'OrigenCuota', onDelete: 'CASCADE' });
    Pueblo.hasMany(DistanciaCuota, { foreignKey: 'pueblo_destino', as: 'DestinoCuota', onDelete: 'CASCADE' });
    DistanciaCuota.belongsTo(Pueblo, { foreignKey: 'pueblo_origen', as: 'OrigenPuebloCuota' });
    DistanciaCuota.belongsTo(Pueblo, { foreignKey: 'pueblo_destino', as: 'DestinoPuebloCuota' });
  
    // Relaciones entre Pueblo y CostoCaseta
    Pueblo.hasMany(CostoCaseta, { foreignKey: 'pueblo_origen', as: 'OrigenCaseta', onDelete: 'CASCADE' });
    Pueblo.hasMany(CostoCaseta, { foreignKey: 'pueblo_destino', as: 'DestinoCaseta', onDelete: 'CASCADE' });
    CostoCaseta.belongsTo(Pueblo, { foreignKey: 'pueblo_origen', as: 'OrigenPuebloCaseta' });
    CostoCaseta.belongsTo(Pueblo, { foreignKey: 'pueblo_destino', as: 'DestinoPuebloCaseta' });
  
    // Relaciones entre User y Calificacion
    User.hasMany(Calificacion, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Calificacion.belongsTo(User, { foreignKey: 'user_id' });
  
    // Relaciones entre Pueblo y Calificacion
    Pueblo.hasMany(Calificacion, { foreignKey: 'pueblo_id', onDelete: 'CASCADE' });
    Calificacion.belongsTo(Pueblo, { foreignKey: 'pueblo_id' });
  }
  
  module.exports = defineRelations;
  