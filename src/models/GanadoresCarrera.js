const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "GanadoresCarrera",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nombreCarrera: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      primerPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iDprimerPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      segundoPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iDsegundoPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tercerPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iDtercerPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuartoPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      iDcuartoPuesto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
