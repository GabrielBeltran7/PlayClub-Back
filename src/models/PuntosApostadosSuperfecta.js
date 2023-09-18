const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "PuntosapostadosSuperfecta",
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

      nombreapuesta: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puesto1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puesto2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puesto3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puesto4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puntosapostados: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      puntosganados: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
