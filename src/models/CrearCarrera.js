const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Crearcarrera",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombrecarrera: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          value: true, // Para indicar que el valor debe ser único
          msg: 'El nombre de la carrera debe ser único.', // Opcional: Mensaje personalizado para el error
        }
      },
      usernameAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      porcentajeWin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      porcentajeExacta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      porcentajeTrifecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      porcentajeSuperfecta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fechadecarrera: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      actydescarrera: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      actydescarrerayganadores: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
