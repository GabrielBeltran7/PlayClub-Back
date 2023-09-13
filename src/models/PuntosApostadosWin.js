const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "PuntosapostadosWin",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      usermane: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nombreapuesta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      corredor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puntosapostadoswin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      puntosganadoswin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
      
    },
    { freezeTableName: true, timestamps: true }
  );
};
