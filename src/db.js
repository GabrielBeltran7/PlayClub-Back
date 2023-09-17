const {Sequelize} =  require("sequelize")
// para utilizar el atchivo env
require("dotenv").config();
// traemos la creacion de los modelos// tablas 
const UserModel = require("./models/User")
const CorredorModel = require("./models/CrearCorredor")
const RecargarpuntosModel =require ("./models/RecargarPuntos")
const PuntosapostadosWinModel = require("./models/PuntosApostadosWin")
const PuntosapostadosExactaModel = require("./models/PuntosApostadosExacta")
const PuntosapostadosTrifectaModel = require("./models/PuntosApostadosTrifecta")
const PuntosapostadosSuperfectaModel = require ("./models/PuntosApostadosSuperfecta")
const CarreraModel = require ("./models/CrearCarrera")

// conexion a postgres utilizando variables del archivo env 
const {EXTERNAL_HOST,
    USER,
    PASSWORD,
    DATABASE,
    PORT,
    DIALECT,} = process.env;
const sequelize = new Sequelize(`${DIALECT}://${USER}:${PASSWORD}@${EXTERNAL_HOST}:${PORT}/${DATABASE}`,
{
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  })

// ejecutamos la funcion de la creacion de la base de datos pasandole sequelize
UserModel(sequelize);
CorredorModel(sequelize)
RecargarpuntosModel(sequelize)
PuntosapostadosWinModel(sequelize)
PuntosapostadosExactaModel(sequelize)
PuntosapostadosTrifectaModel(sequelize)
PuntosapostadosSuperfectaModel(sequelize)
CarreraModel(sequelize)



// aca vamos a crear las Relaciones
 const {User , Recargarpuntos} = sequelize.models;
// //Relacion de Uno a Muchos(Un usuario tiene muchos Post)
User.hasMany(Recargarpuntos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
Recargarpuntos.belongsTo(User)

// exportamos la conexion de sequelize hasta la conexion del servidor 
module.exports ={
    // exportamos todos los modelos de sequelize
    ...sequelize.models,
    conn: sequelize,
}