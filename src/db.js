const { Sequelize } = require("sequelize");
// para utilizar el atchivo env
require("dotenv").config();
// traemos la creacion de los modelos// tablas
const UserModel = require("./models/User");
const CorredorModel = require("./models/CrearCorredor");
const RecargarpuntosModel = require("./models/RecargarPuntos");
const PuntosapostadosWinModel = require("./models/PuntosApostadosWin");
const PuntosapostadosExactaModel = require("./models/PuntosApostadosExacta");
const PuntosapostadosTrifectaModel = require("./models/PuntosApostadosTrifecta");
const PuntosapostadosSuperfectaModel = require("./models/PuntosApostadosSuperfecta");
const CarreraModel = require("./models/CrearCarrera");
const CrearlinkcamarasModel = require("./models/CrearLinkcamara");
const cargarGanadoresModel = require("./models/GanadoresCarrera");
const postCarrerayGanadores = require("./models/GanadoresCarrera");
const postPuntosPagadosModel = require("./models/PuntosPagados");

// //conexion LOCAL
<<<<<<< HEAD
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;
=======
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;
// const sequelize = new Sequelize(
//   `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// // // // CONEXION PARA SUBIR A RENDER  ********************
const { EXTERNAL_HOST } = process.env;
>>>>>>> b6feb2dcd2b2c2dc4d644e8bc4e0bf5545550bff
const sequelize = new Sequelize(
  `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

<<<<<<< HEAD

// // // // CONEXION PARA SUBIR A RENDER  ********************
// const { EXTERNAL_HOST } = process.env;
// const sequelize = new Sequelize(
//   EXTERNAL_HOST,

//   {
//     ssl: true,

//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );




=======
>>>>>>> b6feb2dcd2b2c2dc4d644e8bc4e0bf5545550bff
// ejecutamos la funcion de la creacion de la base de datos pasandole sequelize
UserModel(sequelize);
CorredorModel(sequelize);
RecargarpuntosModel(sequelize);
PuntosapostadosWinModel(sequelize);
PuntosapostadosExactaModel(sequelize);
PuntosapostadosTrifectaModel(sequelize);
PuntosapostadosSuperfectaModel(sequelize);
CarreraModel(sequelize);
CrearlinkcamarasModel(sequelize);
cargarGanadoresModel(sequelize);
postCarrerayGanadores(sequelize);
postPuntosPagadosModel(sequelize);

// aca vamos a crear las Relaciones
const { User, Recargarpuntos, Crearcarrera, Crearcorredor, GanadoresCarrera } =
  sequelize.models;
// //Relacion de Uno a Muchos(Un usuario tiene muchos Post)
User.hasMany(Recargarpuntos, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Recargarpuntos.belongsTo(User);

Crearcarrera.hasMany(Crearcorredor, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Crearcorredor.belongsTo(Crearcarrera);

Crearcarrera.hasMany(GanadoresCarrera, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
GanadoresCarrera.belongsTo(Crearcarrera);

// exportamos la conexion de sequelize hasta la conexion del servidor
module.exports = {
  // exportamos todos los modelos de sequelize
  ...sequelize.models,
  conn: sequelize,
};
