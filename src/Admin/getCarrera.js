const { Crearcarrera } = require("../db");
const getCarrera = async (req, res) => {
  try {
    const carrera = await Crearcarrera.findAll();
    return res.status(200).json(carrera);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getCarrera,
 };