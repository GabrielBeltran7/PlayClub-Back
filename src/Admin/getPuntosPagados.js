const { Puntospagados } = require("../db");
const getPuntosPagados = async (req, res) => {
  try {
    const puntosPagados = await Puntospagados.findAll();
    return res.status(200).json(puntosPagados);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getPuntosPagados,
 };