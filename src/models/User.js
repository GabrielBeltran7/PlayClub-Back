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
        validate: {
          len: {
            args: [5, 10],
            msg: "El nombre debe tener entre 5 y 20 Caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Debe ser un email valido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 10],
            msg: "La contraseña debe tener entre 5 y 10 Caracteres",
          },
        },
      },
      admin: {
        type: DataTypes.BOOLEAN,

        defaultValue: false,
      },
      subadmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cantidadtotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
