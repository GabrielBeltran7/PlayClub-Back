const {DataTypes} = require("sequelize")

// creamos la table Post en  postgres  con sequelize, aca se definen todos los atrivbutos de la tabla
module.exports = (sequelize)=>{
sequelize.define ("Post", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title:{
     type: DataTypes.STRING,
     allowNull: false,
   

    }, 
    body:{
 type: DataTypes.STRING,
     allowNull: false,
 
    }
}, {freezeTableName: true, timestamps: false})
}