const { DataTypes } = require("sequelize");

// creamos la table User en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla

module.exports = (sequelize) => {
  sequelize.define(
    "Puntospagados",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING, 
      },
      subadmin: {
        type: DataTypes.STRING, 
      },
      cantidadquehabia: {
        type: DataTypes.INTEGER, 
      },
      
      cantidadpuntospagados: {
        type: DataTypes.INTEGER,
      },
      cantidadtotal: {
        type: DataTypes.INTEGER,
      
       
      },
      

      
    },
    { freezeTableName: true, timestamps: true }
  );
};
