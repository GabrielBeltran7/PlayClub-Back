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

        unique: true,
        validate: {
          isEmail: {
            msg: "Debe ser un email valido",
          },
        },
      },
      password: {
        type: DataTypes.INTEGER,
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
    { freezeTableName: true, timestamps: false }
  );
};
