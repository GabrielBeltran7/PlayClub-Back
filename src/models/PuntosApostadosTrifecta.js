const { DataTypes } = require("sequelize");

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize) => {
  sequelize.define(
    "PuntosapostadosTrifecta",
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
      win: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      cantidadpuntoswin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      exacta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      cantidadpuntosexacta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },



      trifecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      cantidadpuntostrifecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },


      superfecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      cantidadpuntossuperfecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
      
    },
    { freezeTableName: true, timestamps: true }
  );
};
