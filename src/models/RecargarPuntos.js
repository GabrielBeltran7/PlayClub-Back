const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "Recargarpuntos",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      
      usernameAdmin: {
        type: DataTypes.STRING,
        allowNull: true,
      }
      
 
    },
    { freezeTableName: true, timestamps: true }
  );
};