const { DataTypes } = require("sequelize");


// creamos la table User en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla

module.exports = (sequelize) => {
  sequelize.define(
    "User",
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
      email: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,

        defaultValue: false,
      },
      subadmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
