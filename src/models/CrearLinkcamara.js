const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "Crearlinkcamaras",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      usernameAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     camara1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      camara2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      camara3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      camara4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      camara5: {
        type: DataTypes.STRING,
        allowNull: false,
      }

     
    },
    { freezeTableName: true, timestamps: true }
  );
};
