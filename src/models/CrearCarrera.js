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
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
