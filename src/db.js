const {Sequelize} =  require("sequelize")
// para utilizar el atchivo env
require("dotenv").config();
// traemos la creacion de los modelos// tablas 
const UserModel = require("./models/User")
const CorredorModel = require("./models/CrearCorredor")

// conexion a postgres utilizando variables del archivo env 
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT} = process.env;
const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
{
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  })

// ejecutamos la funcion de la creacion de la base de datos pasandole sequelize
UserModel(sequelize);
CorredorModel(sequelize)


// aca vamos a crear las Relaciones
// const {User , Post} = sequelize.models;
// //Relacion de Uno a Muchos(Un usuario tiene muchos Post)
// User.hasMany(Post, {
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE"
// });

// Relacion de Muchos A  uno. (Muchos post pertenecen  a un Usuario)
// Post.belongsTo(User)



// exportamos la conexion de sequelize hasta la conexion del servidor 
module.exports ={
    // exportamos todos los modelos de sequelize
    ...sequelize.models,
    conn: sequelize,
}