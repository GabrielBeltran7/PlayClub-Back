const { Op } = require("sequelize");
const { User, Post } = require("../db");
const { default: axios } = require("axios");

//EN ESTE CONTROLER CREAMOS EL USUARIO
const createUserDb = async (username, email, password) => {
  const newUser = await User.create({ username, email, password });



            return newUser;
};

module.exports = {
  createUserDb,
};
